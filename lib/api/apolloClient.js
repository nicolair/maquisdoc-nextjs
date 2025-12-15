import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql', // Replace with your GraphQL API endpoint,
  cache: new InMemoryCache(),
});

export default client;
