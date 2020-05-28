import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './utils';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`you should go here ! ${url}`);
});
