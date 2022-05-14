import getConfig from 'next/config';
import prisma from '../../../lib/prisma';

export default async function book(req, res) {
  const { bookId } = req.body;

  try {
    const book = await prisma.book.findUnique({
      where: {
        bookId: bookId,
      },
    });
    res.status(200);
    res.json({ book });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch book' });
  } finally {
    await prisma.$disconnect;
  }
}
