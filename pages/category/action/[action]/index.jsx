import SingleBookPage from '../../../../src/components/SingleBookPage';

import prisma from '../../../../lib/prisma';

const Action = ({ action }) => {
  return <SingleBookPage book={action} />;
};

export default Action;

export async function getStaticPaths() {
  const sus = await prisma.book.findMany();

  const paths = sus?.map((num) => ({
    params: { action: num?.bookId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sus = await prisma.book.findUnique({
    where: {
      bookId: params.action,
    },
  });

  const action = {
    bookId: sus?.bookId,
    cover: sus?.cover,
    title: sus?.title,
    category: sus?.category,
    description: sus?.description,
    totalPages: sus?.totalPages,
    year: sus?.year,
  };

  return { props: { action }, revalidate: 600 };
}
