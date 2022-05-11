import SingleBookPage from '../../../../src/components/SingleBookPage';

const Database = ({ database }) => {
  return <SingleBookPage book={database} />;
};

export default Database;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/search/database');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { database: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.itbook.store/1.0/books/` + params.database
  );
  const database = await res.json();

  //console.log('tes ->>', books);

  if (!database) {
    return {
      notFound: true,
    };
  }

  return { props: { database }, revalidate: 600 };
}
