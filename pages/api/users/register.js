import { getSession } from 'next-auth/react';
const bcrypt = require('bcryptjs');
import prisma from '../../../lib/prisma';

export default async function register(req, res) {
  const { firstName, lastName, phoneNo, email, image, password } = req.body;

  try {
    //const user = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    // console.log('paa -->', hash);

    const users = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        email: email,
        image: image,
        password: hash,
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
