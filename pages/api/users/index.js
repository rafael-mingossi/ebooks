import getConfig from 'next/config';
import prisma from '../../../lib/prisma';

export default async function (req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200);
    res.json({ users });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch users' });
  } finally {
    await prisma.$disconnect;
  }
}
