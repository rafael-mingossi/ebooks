import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  //uri: "https://ebooks-git-test-rafael-mingossi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;
