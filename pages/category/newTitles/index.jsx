import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { requireAuthentication } from '../../../utils/requireAuthentication';

const NewTitles = ({ newTitles }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return <Category category={newTitles?.books} url={last_segment} />;
};

export default NewTitles;

export const getServerSideProps = requireAuthentication(async (context) => {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/new`);
  const newTitles = await res.json();

  // Pass data to the page via props
  return { props: { newTitles } };
});
