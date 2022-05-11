import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Cloud = ({ cloud }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={cloud} url={last_segment} />;
};

export default Cloud;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/search/cloud`);
  const cloud = await res.json();

  //console.log('css -->', css);

  // Pass data to the page via props
  return { props: { cloud } };
}
