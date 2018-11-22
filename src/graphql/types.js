// Imports: GraphQL
import { gql } from 'apollo-server-express';

// GraphQL: TypeDefs
const TYPEDEFS = gql`

type Query {
  holaMundo: String!
  hola(name: String): String
}
`;

// Exports
export default TYPEDEFS;