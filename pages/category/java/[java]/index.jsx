import SingleBookPage from '../../../../src/components/SingleBookPage';

const Java = ({ java }) => {
  return <SingleBookPage book={java} />;
};

export default Java;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/search/java');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { java: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.itbook.store/1.0/books/` + params.java);
  const java = await res.json();

  //console.log('tes ->>', books);

  if (!java) {
    return {
      notFound: true,
    };
  }

  return { props: { java }, revalidate: 600 };
}
