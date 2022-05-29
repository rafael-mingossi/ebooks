import prisma from '../../../lib/prisma';

export default async function (req, res) {
  try {
    const feed = await prisma.feed.findMany();
    res.status(200);
    res.json({ feed });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch users' });
  } finally {
    await prisma.$disconnect;
  }
}
