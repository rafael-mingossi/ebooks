import SingleBookPage from '../../../../src/components/SingleBookPage';

const NewTitles = ({ books }) => {
  return <SingleBookPage book={books} />;
};

export default NewTitles;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/new');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { newTitles: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.itbook.store/1.0/books/` + params.newTitles
  );
  const books = await res.json();

  if (!books) {
    return {
      notFound: true,
    };
  }

  return { props: { books }, revalidate: 600 };
}
