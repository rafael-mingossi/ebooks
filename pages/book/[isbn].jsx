import SingleBookPage from '../../src/components/SingleBookPage';

const SingleBook = ({ books }) => {
  return <SingleBookPage book={books} />;
};

export default SingleBook;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/new');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { isbn: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.itbook.store/1.0/books/` + params.isbn);
  const books = await res.json();

  console.log('tes ->>', books);

  if (!books) {
    return {
      notFound: true,
    };
  }

  //   const book = books?.books
  //     ?.map((item) => ({
  //       title: item?.title,
  //       subtitle: item?.subtitle,
  //       isbn13: item?.isbn13,
  //       image: item?.image,
  //     }))
  //     .filter(({ isbn13 }) => isbn13 === params.isbn);

  return { props: { books }, revalidate: 600 };
}