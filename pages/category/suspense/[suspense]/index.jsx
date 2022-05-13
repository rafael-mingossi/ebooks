import SingleBookPage from '../../../../src/components/SingleBookPage';

const Css = ({ suspense }) => {
  return <SingleBookPage book={suspense} />;
};

export default Css;

export async function getStaticPaths() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
      'X-RapidAPI-Key': 'c680d2ddabmsh84d9167c6748786p1f401fjsn82c5cb17e43b',
    },
  };

  const sus = await fetch(
    'https://hapi-books.p.rapidapi.com/week/suspense',
    options
  );
  const isbnNum = await sus.json();

  const paths = isbnNum?.map((num) => ({
    params: { suspense: num.book_id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
      'X-RapidAPI-Key': 'c680d2ddabmsh84d9167c6748786p1f401fjsn82c5cb17e43b',
    },
  };

  const sus = await fetch(
    `https://hapi-books.p.rapidapi.com/book/` + params.suspense,
    options
  ).catch((err) => console.error(err));

  const suspense = await sus.json();

  if (!suspense) {
    return {
      notFound: true,
    };
  }

  return { props: { suspense }, revalidate: 600 };
}
