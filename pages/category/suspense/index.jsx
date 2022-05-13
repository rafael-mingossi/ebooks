import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Suspense = ({ suspense }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={suspense} url={last_segment} />;
};

export default Suspense;

export async function getServerSideProps() {
  const env = process.env.NODE_ENV;
  let url = '';

  if (env === 'development') {
    url = process.env.DEV;
  } else if (env === 'production') {
    url = process.env.PROD;
  }

  const sus = await fetch(url);
  const susp = await sus.json();

  const suspense = susp?.books
    ?.map((book) => ({
      bookId: book?.bookId,
      cover: book?.cover,
      title: book?.title,
      category: book?.category,
      description: book?.description,
      totalPages: book?.totalPages,
      year: book?.year,
    }))
    .filter(({ category }) => category === 'suspense');
  //console.log(suspense);

  // Pass data to the page via props
  return { props: { suspense } };
}
