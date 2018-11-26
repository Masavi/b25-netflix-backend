// Imports: GraphQL Apollo Server
import { ApolloServer } from 'apollo-server-express';

// Imports: GraphQL TypeDefs & Resolvers
import TypeDefs    from './typedefs/types';
import Query    from './resolvers/query';
import Mutation from './resolvers/mutation';

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: TypeDefs,
  resolvers: { Query, Mutation },
  playground: {
    endpoint: `http://localhost:5000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});

export default SERVER;