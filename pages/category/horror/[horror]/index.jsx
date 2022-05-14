import SingleBookPage from '../../../../src/components/SingleBookPage';
import prisma from '../../../../lib/prisma';

const Horror = ({ horror }) => {
  return <SingleBookPage book={horror} />;
};

export default Horror;

export async function getStaticPaths() {
  const hor = await prisma.book.findMany();

  const paths = hor?.map((num) => ({
    params: { horror: num?.bookId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const hor = await prisma.book.findUnique({
    where: {
      bookId: params.horror,
    },
  });

  const horror = {
    bookId: hor?.bookId,
    cover: hor?.cover,
    title: hor?.title,
    category: hor?.category,
    description: hor?.description,
    totalPages: hor?.totalPages,
    year: hor?.year,
  };

  return { props: { horror }, revalidate: 600 };
}
