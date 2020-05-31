import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './utils';

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await mongoose.connect('mongodb://localhost:27017/sicekon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  server.listen().then(({ url }) => {
    console.log(`you should go here ! ${url}`);
  });
};

startServer();
