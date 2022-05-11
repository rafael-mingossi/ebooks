import SingleBookPage from '../../../../src/components/SingleBookPage';

const Php = ({ php }) => {
  return <SingleBookPage book={php} />;
};

export default Php;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/search/php');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { php: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.itbook.store/1.0/books/` + params.php);
  const php = await res.json();

  //console.log('tes ->>', books);

  if (!php) {
    return {
      notFound: true,
    };
  }

  return { props: { php }, revalidate: 600 };
}
