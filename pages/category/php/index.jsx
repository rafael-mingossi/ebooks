import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Php = ({ php }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={php?.books} url={last_segment} />;
};

export default Php;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/search/php`);
  const php = await res.json();

  //console.log('css -->', css);

  // Pass data to the page via props
  return { props: { php } };
}
