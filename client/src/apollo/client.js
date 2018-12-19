import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const SERVER = 'http://localhost:4000/graphql';
const WS_SERVER = 'ws://localhost:4000/graphql';
const cache = new InMemoryCache();

const httpLink = new createHttpLink({
  uri: SERVER,
});
export const wsLink = new WebSocketLink({
  uri: WS_SERVER,
  options: {
    reconnect: true,
    connectionParams: async () => {
      return {};
    },
  },
});
const defaultOptions = {
  query: {
    fetchPolicy: 'network-only',
  },
};

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link: terminatingLink,
  cache,
  defaultOptions,
});

export default client;