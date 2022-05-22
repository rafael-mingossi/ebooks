import SingleBookPage from '../../../../src/components/SingleBookPage';

import prisma from '../../../../lib/prisma';

const Fiction = ({ fiction }) => {
  return <SingleBookPage book={fiction} />;
};

export default Fiction;

export async function getStaticPaths() {
  const sus = await prisma.book.findMany();

  const paths = sus?.map((num) => ({
    params: { fiction: num?.bookId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sus = await prisma.book.findUnique({
    where: {
      bookId: params.fiction,
    },
  });

  const fiction = {
    bookId: sus?.bookId,
    cover: sus?.cover,
    title: sus?.title,
    category: sus?.category,
    description: sus?.description,
    totalPages: sus?.totalPages,
    year: sus?.year,
  };

  return { props: { fiction }, revalidate: 600 };
}
