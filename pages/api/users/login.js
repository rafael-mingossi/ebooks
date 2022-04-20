const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken'
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';
import prisma from '../../../lib/prisma';

const { serverRuntimeConfig } = getConfig();

export default async function login(req, res) {
  const body = JSON.parse(req.body);
  const { email, password } = body;

  const userLogin = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //console.log('userLogin -->', userLogin);

  if (userLogin) {
    if (email === userLogin.email || password === userLogin.password) {
      console.log('validation worked');

      if (!bcrypt.compareSync(password, userLogin.password)) {
        throw 'password is incorrect';
      }

      const token = jwt.sign(
        { sub: userLogin.id },
        serverRuntimeConfig.secret,
        {
          expiresIn: '7d',
        }
      );

      return res.status(200).json({
        userLogin,
        token,
      });
    } else {
      console.log('validation crashed');

      res.status(500);
      res.json({ error: 'Unnable to authenticate user' });
    }
  } else {
    res.status(500);
    res.json({ error: 'Unnable to authenticate user' });
  }
}
