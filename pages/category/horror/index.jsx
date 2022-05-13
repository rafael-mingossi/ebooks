import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Horror = ({ horror }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={horror} url={last_segment} />;
};

export default Horror;

export async function getServerSideProps() {
  const hor = await fetch(process.env.DEV);
  const horr = await hor.json();

  const horror = horr?.books
    ?.map((book) => ({
      bookId: book?.bookId,
      cover: book?.cover,
      title: book?.title,
      category: book?.category,
      description: book?.description,
      totalPages: book?.totalPages,
      year: book?.year,
    }))
    .filter(({ category }) => category === 'horror');
  //console.log(suspense);

  // Pass data to the page via props
  return { props: { horror } };
}
