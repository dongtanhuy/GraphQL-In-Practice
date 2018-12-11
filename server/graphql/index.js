import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      console.log('subscription working');
      return ;
    }
  },
  introspection: true,
});
server.applyMiddleware({app});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  const url = `http://localhost:4000${server.graphqlPath}`;
  console.log(`🚀 GraphQL server ready at ${url}`);
});
// app.listen(3000, () => {
//   console.log('Server is running on PORT: 3000');
// })