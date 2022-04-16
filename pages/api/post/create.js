import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { firstName, lastName, phoneNo, email, image } = req.body;

  try {
    //const user = req.body;
    const users = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        email: email,
        image: image,
        // role: userData.role,
        // userId: userData.userId,
        // createdAt: userData.createdAt,
        // updatedAt: userData.updatedAt,
        // emailVerified: userData.emailVerified,
      },
    });

    res.status(201);
    res.json({ users });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unnable to create user' });
    console.error(e);
  } finally {
    prisma.$disconnect;
  }

  console.log('body ->>>', req.body);
}
