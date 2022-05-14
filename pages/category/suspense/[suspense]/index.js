import SingleBookPage from '../../../../src/components/SingleBookPage';

import prisma from '../../../../lib/prisma';

const Suspense = ({ suspense }) => {
  return <SingleBookPage book={suspense} />;
};

export default Suspense;

export async function getStaticPaths() {
  const sus = await prisma.book.findMany();

  const paths = sus?.map((num) => ({
    params: { suspense: num?.bookId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sus = await prisma.book.findUnique({
    where: {
      bookId: params.suspense,
    },
  });

  const suspense = {
    bookId: sus?.bookId,
    cover: sus?.cover,
    title: sus?.title,
    category: sus?.category,
    description: sus?.description,
    totalPages: sus?.totalPages,
    year: sus?.year,
  };

  return { props: { suspense }, revalidate: 600 };
}
