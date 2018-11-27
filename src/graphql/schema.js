// Imports: GraphQL Apollo Server
import { ApolloServer } from 'apollo-server-express';

// Imports: GraphQL TypeDefs & Resolvers
import TypeDefs from './typedefs/types';
import Query    from './resolvers/query';
import Mutation from './resolvers/mutation';

// Imports: Utilities
import verifyToken from '../utils/verifyToken';

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs:  TypeDefs,
  resolvers: { Query, Mutation },
  context:   async context => ({
    ...context,
    user: await verifyToken(context)
  }),
  playground: {
    endpoint: `http://localhost:5000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});

export default SERVER;