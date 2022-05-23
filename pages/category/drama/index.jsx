import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '../../../lib/prisma';

const Drama = ({ drama }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={drama} url={last_segment} />;
};

export default Drama;

export async function getStaticProps() {
  const sus = await prisma.book.findMany();

  const drama = await sus
    ?.map((sus) => ({
      bookId: sus?.bookId,
      cover: sus?.cover,
      title: sus?.title,
      category: sus?.category,
      description: sus?.description,
      totalPages: sus?.totalPages,
      year: sus?.year,
    }))
    .filter(({ category }) => category === 'drama');

  // Pass data to the page via props
  return { props: { drama }, revalidate: 10 };
}
