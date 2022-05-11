import SingleBookPage from '../../../../src/components/SingleBookPage';

const Python = ({ python }) => {
  return <SingleBookPage book={python} />;
};

export default Python;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/search/python');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { python: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.itbook.store/1.0/books/` + params.python
  );
  const python = await res.json();

  //console.log('tes ->>', books);

  if (!python) {
    return {
      notFound: true,
    };
  }

  return { props: { python }, revalidate: 600 };
}
