import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import Header from '../src/components/common/Header';
import About from '../src/components/common/About';

const AllBooksQuery = gql`
  query {
    books {
      title
    }
  }
`;

export default function Home() {
  //const { data, error, loading } = useQuery(AllBooksQuery);

  // if (loading) return <p>Loading....</p>;
  // if (error) return <p>Error, {error.message}</p>

  //console.log(data);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <About />
      {/* <div>
        {data?.books?.map((res) => (
          <div key={res.title}>
            <p>{res.title}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://api.itbook.store/1.0/new`);
//   const data = await res.json();

//   // console.dir(data, { depth: null });

//   // Pass data to the page via props
//   return { props: { data } };
// }
