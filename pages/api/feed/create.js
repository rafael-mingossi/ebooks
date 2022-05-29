import prisma from '../../../lib/prisma';

export default async function feedbacks(req, res) {
  const body = JSON.parse(req.body);
  const { firstName, lastName, phoneNo, email, message } = body;

  console.log('body1 ->>>', body);

  try {
    const feedback = await prisma.feedback.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNo: parseInt(phoneNo),
        email: email,
        message: message,
      },
    });

    res.status(201);
    res.json({ feedback });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unnable to create feedback' });
    console.error(e);
  } finally {
    prisma.$disconnect;
  }

  console.log('body2 ->>>', req.body);
}
