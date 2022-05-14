import SingleBookPage from '../../../../src/components/SingleBookPage';

const Suspense = ({ suspense }) => {
  return <SingleBookPage book={suspense[0]} />;
};

export default Suspense;

export async function getStaticPaths() {
  const env = process.env.NODE_ENV;
  let url = '';

  if (env === 'development') {
    url = process.env.DEV;
  } else if (env === 'production') {
    url = process.env.PROD;
  }

  const sus = await fetch(url);
  const susp = await sus.json();

  const paths = susp?.books?.map((num) => ({
    params: { suspense: num.bookId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const env = process.env.NODE_ENV;
  let url = '';

  if (env === 'development') {
    url = process.env.DEV;
  } else if (env === 'production') {
    url = process.env.PROD;
  }
  const sus = await fetch(url);
  const susp = await sus.json();

  const suspense = susp?.books
    ?.map((book) => ({
      bookId: book?.bookId,
      cover: book?.cover,
      title: book?.title,
      category: book?.category,
      description: book?.description,
      totalPages: book?.totalPages,
      year: book?.year,
    }))
    .filter(({ bookId }) => bookId === params.suspense);

  return { props: { suspense }, revalidate: 600 };
}
