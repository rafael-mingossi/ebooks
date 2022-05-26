import cookie from 'cookie';
//import { serialize } from 'cookie';

export default function (req, res) {
  const { cookies } = req;

  const jwt = cookies.EbooksJWT;

  if (!jwt) {
    return res.json({ message: 'you are already not logged in...' });
  } else {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('EbooksJWT', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      })
    );

    return res.status(200).json({ message: 'Successfuly logged out!' });
  }

  // if (!jwt) {
  //   return res.json({ message: 'you are already not logged in...' });
  // } else {
  //   const serialised = serialize('EbooksJWT', null, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV !== 'development',
  //     sameSite: true,
  //     maxAge: -1,
  //     path: '/',
  //   });

  //   res.setHeader('Set-Cookie', serialised);

  //   res.status(200).json({ message: 'Successfuly logged out!' });
  // }
}
