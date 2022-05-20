import prisma from '../../../lib/prisma';

export default async function update(req, res) {
  const body = JSON.parse(req.body);
  const { userId } = body;
  //const userId = req.params.userId;

  try {
    const delUsers = await prisma.user.delete({
      where: {
        userId: userId,
      },
    });

    res.status(200);
    res.json({ delUsers });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unnable to delete user' });
    console.error(e);
  } finally {
    prisma.$disconnect;
  }
}
