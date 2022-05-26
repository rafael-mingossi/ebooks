import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { requireAuthentication } from '../../../utils/requireAuthentication';
import prisma from '../../../lib/prisma';
import { PageHeader } from '/src/components';

const Horror = ({ horror }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <PageHeader title={'Horror'} />
      <Category category={horror} url={last_segment} />
    </div>
  );
};

export default Horror;

export const getServerSideProps = requireAuthentication(async (context) => {
  const sus = await prisma.book.findMany();

  const horror = await sus
    ?.map((sus) => ({
      bookId: sus?.bookId,
      cover: sus?.cover,
      title: sus?.title,
      category: sus?.category,
      description: sus?.description,
      totalPages: sus?.totalPages,
      year: sus?.year,
    }))
    .filter(({ category }) => category === 'horror');

  // Pass data to the page via props
  return { props: { horror } };
});
