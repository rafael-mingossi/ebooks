export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ message: 'Invalid token!' });
  }
  console.log(jwt);
  return res.json({ data: 'Top secret data!' });
}
