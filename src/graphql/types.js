// Imports: GraphQL
import { gql } from 'apollo-server-express';

import mongoose from 'mongoose';

// GraphQL: TypeDefs
const TYPEDEFS = gql`

type Movie {
  _id: String
  name: String
  director: String
}

type Query {
  hola(name: String): String
  allMovies: [Movie]
}

input MovieInput {
  name: String!
  director: String!
}

type Mutation {
  createMovie(input: MovieInput) : Movie
}
`;

// Exports
export default TYPEDEFS;