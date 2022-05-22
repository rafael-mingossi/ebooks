import { getSession } from 'next-auth/react';

import prisma from '../../../lib/prisma';

export default async function register(req, res) {
  const body = JSON.parse(req.body);
  const { title, cover, description, category, totalPages, year, content } =
    body;

  console.log('first body -->', body);

  try {
    const book = await prisma.book.create({
      data: {
        title: title,
        cover: cover,
        description: description,
        category: category,
        totalPages: parseInt(totalPages),
        year: parseInt(year),
        content: content,
      },
    });

    res.status(201);
    res.json({ book });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unnable to add new book' });
    console.error(e);
  } finally {
    prisma.$disconnect;
  }

  console.log('body ->>>', req.body);
}
