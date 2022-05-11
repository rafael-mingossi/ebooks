import SingleBookPage from '../../../../src/components/SingleBookPage';

const Cloud = ({ cloud }) => {
  return <SingleBookPage book={cloud} />;
};

export default Cloud;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/search/cloud');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { cloud: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.itbook.store/1.0/books/` + params.cloud);
  const cloud = await res.json();

  //console.log('tes ->>', books);

  if (!cloud) {
    return {
      notFound: true,
    };
  }

  return { props: { cloud }, revalidate: 600 };
}
