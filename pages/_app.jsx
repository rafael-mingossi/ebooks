import '../utils/globals.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { createContext, useState, useEffect } from 'react';
import { Layout } from '/src/components';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ViewContext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { getUserItem } = useLocalStorage({});

  useEffect(() => {
    const loggedInUser = getUserItem({ key: 'user' });
    const userToken = getUserItem({ key: 'token' });
    if (loggedInUser && userToken) {
      setViewContext({
        ...viewContext,
        user: loggedInUser,
        token: userToken,
      });
      //router.push('/Home');
    }
  }, []);

  const [viewContext, setViewContext] = useState({
    isRegisterOpen: false,
    popupElement: {
      show: false,
      text: 'test text here',
    },
    token: '',
    user: {},
  });

  return (
    <ViewContext.Provider value={[viewContext, setViewContext]}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ViewContext.Provider>
  );
}

export default MyApp;
