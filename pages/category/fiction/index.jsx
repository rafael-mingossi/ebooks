import Category from '../../../src/components/CategoryPage';
import { useRouter } from 'next/router';
import { requireAuthentication } from '../../../utils/requireAuthentication';
import prisma from '../../../lib/prisma';
import { PageHeader } from '/src/components';

const Fiction = ({ fiction }) => {
  const router = useRouter();
  const last_segment = router.pathname.split('/').pop();

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <PageHeader title={'Fiction'} />
      <Category category={fiction} url={last_segment} />
    </div>
  );
};

export default Fiction;

export const getServerSideProps = requireAuthentication(async (context) => {
  const sus = await prisma.book.findMany();

  const fiction = await sus
    ?.map((sus) => ({
      bookId: sus?.bookId,
      cover: sus?.cover,
      title: sus?.title,
      category: sus?.category,
      description: sus?.description,
      totalPages: sus?.totalPages,
      year: sus?.year,
    }))
    .filter(({ category }) => category === 'fiction');

  // Pass data to the page via props
  return { props: { fiction } };
});
