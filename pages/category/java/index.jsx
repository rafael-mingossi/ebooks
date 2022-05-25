import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { requireAuthentication } from '../../../utils/requireAuthentication';

const Java = ({ java }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={java?.books} url={last_segment} />;
};

export default Java;

export const getServerSideProps = requireAuthentication(async (context) => {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/search/java`);
  const java = await res.json();

  // Pass data to the page via props
  return { props: { java } };
});
