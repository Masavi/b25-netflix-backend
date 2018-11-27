// Imports: GraphQL
import { gql } from 'apollo-server-express';

// GraphQL: TypeDefs
const TYPEDEFS = gql`

scalar ObjectID

type AuthToken {
    token:String
}

type User {
    first_name:String
    last_name:String
    email:String
    birth_date:String
    gender:String
    nationality:String
    #history:[Movie]
    #favorites:[Movie]
    is_active:Boolean
    #user_payment:String
}

input UserInput {
    first_name:String!
    last_name:String!
    email:String!
    password:String!
    birth_date:String
    gender:String
    nationality:String
}

type cast {
  name: String
  role: String
}

input castInput {
  name: String
  role: String
}

enum rate {
  A
  B
  B15
  C
}

type Movie {
  _id: ObjectID!
  name: String!
  genre: String
  director: String!
  cast: cast 
  sinopsis: String
  released_date: String
  rating: Int
  rate: rate
  language: String
  cover: String
  movie_url: String
  is_active: Boolean
}

type Query {

  # User
  me: User
  
  # Movies
  oneMovie(id: ObjectID) : Movie
  allMovies: [Movie]
}

input MovieInput {
  name: String!
  genre: String
  director: String!
  cast: [castInput] 
  sinopsis: String
  released_date: String
  rating: Int
  rate: rate
  language: String
  cover: String
  movie_url: String
  is_active: Boolean
}

type Mutation {

  # User
  signup(data:UserInput!) : AuthToken
  login(email:String!,password:String!):AuthToken

  # Movie
  createMovie(input: MovieInput) : Movie
  updateMovie(id: ObjectID, input: MovieInput) : Movie
  deleteMovie(id: ObjectID) : String
}
`;

// Exports
export default TYPEDEFS;