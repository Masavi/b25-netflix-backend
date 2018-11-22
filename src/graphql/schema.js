// Imports: GraphQL
import { ApolloServer } from 'apollo-server-express';

// Imports: GraphQL TypeDefs & Resolvers
import TYPEDEFS from './types.js';
import RESOLVERS from './resolvers.js';

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  playground: {
    endpoint: `http://localhost:5000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});

// Exports
// module.exports = SERVER;
export default SERVER;