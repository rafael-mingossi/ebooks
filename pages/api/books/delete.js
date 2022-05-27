import prisma from '../../../lib/prisma';

export default async function (req, res) {
  const body = JSON.parse(req.body);
  const { bookId } = body;
  //const userId = req.params.userId;

  try {
    const delBook = await prisma.book.delete({
      where: {
        bookId: bookId,
      },
    });

    res.status(200);
    res.json({ delBook });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unnable to delete book' });
    console.error(e);
  } finally {
    prisma.$disconnect;
  }
}
