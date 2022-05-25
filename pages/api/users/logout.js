import cookie from 'cookie';

export default async function (req, res) {
  if (req.method !== 'POST')
    return res
      .status(405)
      .json({ status: 'fail', message: 'Method not allowed here!' });

  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ message: 'you are already not logged in...' });
  } else {
    if (req.body.key === 'static_key') {
      res.setHeader('Set-Cookie', [
        cookie.serialize('OursiteJWT', 'false', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: true,
          maxAge: -1,
          path: '/',
        }),
      ]);

      return res.status(200).json({ message: 'Successfuly logged out!' });
    }

    return res
      .status(400)
      .json({ status: 'fail', message: 'Bad request happened!' });
  }

  // if (!jwt) {
  //   return res.json({ message: 'you are already not logged in...' });
  // } else {
  //   const serialised = serialize('OursiteJWT', null, {
  //     httpOnly: true,
  //     //secure: process.env.NODE_ENV !== 'development',
  //     sameSite: 'strict',
  //     maxAge: -1,
  //     path: '/',
  //   });

  //   res.setHeader('Set-Cookie', serialised);

  //   res.status(200).json({ message: 'Successfuly logged out!' });
  // }
}
