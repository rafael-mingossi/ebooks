import { useState, useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { About, Login } from '/src/components';
import { useRouter } from 'next/router';
import prisma from '../../lib/prisma';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ViewContext } from '../../pages/_app';

// const AllBooksQuery = gql`
//   query
//     books {
//       title
//     }
//   }
// `;

const LoginPage = () => {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const { setItem, getItem } = useLocalStorage({});
  const router = useRouter();
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  //const session = getSession();
  //console.log('sess ->>', session);

  //const { data, error, loading } = useQuery(AllBooksQuery);

  // if (loading) return <p>Loading....</p>;
  // if (error) return <p>Error, {error.message}</p>

  useEffect(() => {
    const loggedInUser = getItem({ key: 'user' });
    const userToken = getItem({ key: 'token' });
    if (loggedInUser && userToken) {
      setUser(loggedInUser);
      setToken(userToken);
      router.push('/Home');
    }
  }, []);

  // console.log('st -->', token);

  return (
    <div>
      <About />
      <Login />
      {/* <div>
        {data?.books?.map((res) => (
          <div key={res.title}>
            <p>{res.title}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default LoginPage;
