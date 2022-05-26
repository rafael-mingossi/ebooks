import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { requireAuthentication } from '../../../utils/requireAuthentication';
import { PageHeader } from '/src/components';

const Css = ({ css }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <PageHeader title={'CSS'} />
      <Category category={css?.books} url={last_segment} />
    </div>
  );
};

export default Css;

export const getServerSideProps = requireAuthentication(async (context) => {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/search/css`);
  const css = await res.json();

  // Pass data to the page via props
  return { props: { css } };
});
