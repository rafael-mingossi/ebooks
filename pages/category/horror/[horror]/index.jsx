import SingleBookPage from '../../../../src/components/SingleBookPage';

const Horror = ({ horror }) => {
  return <SingleBookPage book={horror[0]} />;
};

export default Horror;

export async function getStaticPaths() {
  const env = process.env.NODE_ENV;
  let url = '';

  if (env === 'development') {
    url = process.env.DEV;
  } else if (env === 'production') {
    url = process.env.PROD;
  }

  const hor = await fetch(url);
  const horr = await hor.json();

  const paths = horr?.books?.map((num) => ({
    params: { horror: num.bookId },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const env = process.env.NODE_ENV;
  let url = '';

  if (env === 'development') {
    url = process.env.DEV;
  } else if (env === 'production') {
    url = process.env.PROD;
  }

  const hor = await fetch(url);
  const horr = await hor.json();

  const horror = horr?.books
    ?.map((book) => ({
      bookId: book?.bookId,
      cover: book?.cover,
      title: book?.title,
      category: book?.category,
      description: book?.description,
      totalPages: book?.totalPages,
      year: book?.year,
    }))
    .filter(({ bookId }) => bookId === params.horror);

  return { props: { horror }, revalidate: 600 };
}
