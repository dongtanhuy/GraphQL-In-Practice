import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const SERVER = 'http://localhost:4000/graphql';
const cache = new InMemoryCache();

const httpLink = new createHttpLink({
  uri: SERVER,
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});
export default client;