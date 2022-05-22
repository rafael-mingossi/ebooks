import SingleBookPage from '../../../../src/components/SingleBookPage';

import prisma from '../../../../lib/prisma';

const Drama = ({ drama }) => {
  return <SingleBookPage book={drama} />;
};

export default Drama;

export async function getStaticPaths() {
  const sus = await prisma.book.findMany();

  const paths = sus?.map((num) => ({
    params: { drama: num?.bookId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sus = await prisma.book.findUnique({
    where: {
      bookId: params.drama,
    },
  });

  const drama = {
    bookId: sus?.bookId,
    cover: sus?.cover,
    title: sus?.title,
    category: sus?.category,
    description: sus?.description,
    totalPages: sus?.totalPages,
    year: sus?.year,
  };

  return { props: { drama }, revalidate: 600 };
}
