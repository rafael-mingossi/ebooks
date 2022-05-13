import getConfig from 'next/config';
import prisma from '../../../lib/prisma';

export default async function (req, res) {
  try {
    const books = await prisma.book.findMany();
    res.status(200);
    res.json({ books });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch books' });
  } finally {
    await prisma.$disconnect;
  }
}
