import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { requireAuthentication } from '../../../utils/requireAuthentication';
import { PageHeader } from '/src/components';

const Database = ({ database }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <PageHeader title={'Database'} />
      <Category category={database?.books} url={last_segment} />
    </div>
  );
};

export default Database;

export const getServerSideProps = requireAuthentication(async (context) => {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/search/database`);
  const database = await res.json();

  // Pass data to the page via props
  return { props: { database } };
});
