import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Suspense = ({ suspense }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={suspense} url={last_segment} />;
};

export default Suspense;

export async function getServerSideProps() {
  // Fetch data from external API
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
      'X-RapidAPI-Key': 'c680d2ddabmsh84d9167c6748786p1f401fjsn82c5cb17e43b',
    },
  };

  const sus = await fetch(
    'https://hapi-books.p.rapidapi.com/week/suspense',
    options
  );

  const suspense = await sus.json();

  console.log('sus -->', suspense);
  // console.dir(data, { depth: null });

  // Pass data to the page via props
  return { props: { suspense } };
}
