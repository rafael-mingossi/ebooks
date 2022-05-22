import SingleBookPage from '../../../../src/components/SingleBookPage';

import prisma from '../../../../lib/prisma';

const Comedy = ({ comedy }) => {
  return <SingleBookPage book={comedy} />;
};

export default Comedy;

export async function getStaticPaths() {
  const sus = await prisma.book.findMany();

  const paths = sus?.map((num) => ({
    params: { comedy: num?.bookId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sus = await prisma.book.findUnique({
    where: {
      bookId: params.comedy,
    },
  });

  const comedy = {
    bookId: sus?.bookId,
    cover: sus?.cover,
    title: sus?.title,
    category: sus?.category,
    description: sus?.description,
    totalPages: sus?.totalPages,
    year: sus?.year,
  };

  return { props: { comedy }, revalidate: 600 };
}
