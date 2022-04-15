import '../utils/globals.css';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { createContext, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

export const ViewContext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [viewContext, setViewContext] = useState({
    isRegisterOpen: false,
    popupElement: {
      show: false,
      text: 'test text here',
    },
  });

  return (
    <SessionProvider session={pageProps.session}>
      <ViewContext.Provider value={[viewContext, setViewContext]}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ViewContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
