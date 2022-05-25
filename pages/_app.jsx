import '../utils/globals.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { createContext, useState, useEffect } from 'react';
import { Layout } from '/src/components';

export const ViewContext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
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
