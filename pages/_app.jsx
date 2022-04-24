import '../utils/globals.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { createContext, useState } from 'react';

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
        <Component {...pageProps} />
      </ApolloProvider>
    </ViewContext.Provider>
  );
}

export default MyApp;
