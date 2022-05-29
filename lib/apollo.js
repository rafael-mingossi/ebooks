import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  //uri: 'http://localhost:3000/api/graphql',
  uri: 'https://ebooks-one.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
