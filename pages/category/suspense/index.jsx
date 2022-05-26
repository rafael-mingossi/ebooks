import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { requireAuthentication } from '../../../utils/requireAuthentication';
import prisma from '../../../lib/prisma';
import { PageHeader } from '/src/components';

const Suspense = ({ suspense }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <PageHeader title={'Suspense'} />
      <Category category={suspense} url={last_segment} />
    </div>
  );
};

export default Suspense;

export const getServerSideProps = requireAuthentication(async (context) => {
  const sus = await prisma.book.findMany();

  const suspense = sus
    ?.map((sus) => ({
      bookId: sus?.bookId,
      cover: sus?.cover,
      title: sus?.title,
      category: sus?.category,
      description: sus?.description,
      totalPages: sus?.totalPages,
      year: sus?.year,
    }))
    .filter(({ category }) => category === 'suspense');

  // Pass data to the page via props
  return { props: { suspense } };
});
