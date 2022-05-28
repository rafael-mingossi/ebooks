import prisma from '../../../lib/prisma';

export default async function (req, res) {
  try {
    const feedb = await prisma.feedback.findMany();
    res.status(200);
    res.json({ feedb });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch users' });
  } finally {
    await prisma.$disconnect;
  }
}
