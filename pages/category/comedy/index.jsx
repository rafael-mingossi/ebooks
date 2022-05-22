import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '../../../lib/prisma';

const Comedy = ({ comedy }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={comedy} url={last_segment} />;
};

export default Comedy;

export async function getServerSideProps() {
  const sus = await prisma.book.findMany();

  const comedy = await sus
    ?.map((sus) => ({
      bookId: sus?.bookId,
      cover: sus?.cover,
      title: sus?.title,
      category: sus?.category,
      description: sus?.description,
      totalPages: sus?.totalPages,
      year: sus?.year,
    }))
    .filter(({ category }) => category === 'comedy');

  // Pass data to the page via props
  return { props: { comedy } };
}
