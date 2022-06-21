const bcrypt = require('bcryptjs');
import prisma from '../../../lib/prisma';

export default async function register(req, res) {
  const body = JSON.parse(req.body);
  const { firstName, lastName, phoneNo, email, image, password } = body;

  try {
    //const user = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const users = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNo: parseInt(phoneNo),
        email: email,
        image: image,
        password: hash,
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
}
