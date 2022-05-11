import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Database = ({ database }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={database} url={last_segment} />;
};

export default Database;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/search/database`);
  const database = await res.json();

  //console.log('css -->', css);

  // Pass data to the page via props
  return { props: { database } };
}
