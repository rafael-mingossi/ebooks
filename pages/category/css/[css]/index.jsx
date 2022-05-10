import SingleBookPage from '../../../../src/components/SingleBookPage';

const Css = ({ css }) => {
  return <SingleBookPage book={css} />;
};

export default Css;

export async function getStaticPaths() {
  const res = await fetch('https://api.itbook.store/1.0/search/css');
  const isbnNum = await res.json();

  const paths = isbnNum?.books?.map((num) => ({
    params: { css: num.isbn13 },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.itbook.store/1.0/books/` + params.css);
  const css = await res.json();

  //console.log('tes ->>', books);

  if (!css) {
    return {
      notFound: true,
    };
  }

  return { props: { css }, revalidate: 600 };
}
