import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Python = ({ python }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={python?.books} url={last_segment} />;
};

export default Python;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/search/python`);
  const python = await res.json();

  //console.log('css -->', css);

  // Pass data to the page via props
  return { props: { python } };
}
