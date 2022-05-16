import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '../../../lib/prisma';

const Suspense = ({ suspense }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={suspense} url={last_segment} />;
};

export default Suspense;

export async function getServerSideProps() {
  const sus = await prisma.book.findUnique({
    where: {
      bookId: params.suspense,
    },
  });

  const suspense = {
    bookId: sus?.bookId,
    cover: sus?.cover,
    title: sus?.title,
    category: sus?.category,
    description: sus?.description,
    totalPages: sus?.totalPages,
    year: sus?.year,
  };

  // Pass data to the page via props
  return { props: { suspense } };
}
