const bcrypt = require('bcryptjs');
import prisma from '../../../lib/prisma';

export default async function update(req, res) {
  const body = JSON.parse(req.body);
  const { firstName, lastName, phoneNo, email, image, password } = body;

  //console.log(body);

  try {
    //const user = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const newUsers = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNo: parseInt(phoneNo),
        image: image,
        password: hash,
        email: email,
      },
    });

    res.status(200);
    res.json({ newUsers });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unnable to update user' });
    console.error(e);
  } finally {
    prisma.$disconnect;
  }

  //console.log('NEWbody ->>>', req.body);
}
