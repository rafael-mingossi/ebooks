import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { firstName, lastName, phoneNo, email, password } = req.body;

  //const session = await getSession({ req });
  const result = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      email: email,
      password: password,
    },
  });
  res.json(result);
}
