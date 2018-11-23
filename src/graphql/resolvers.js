// Mongodb Models
import Movie from '../models/Movie';
import mongoose from '../database/mongoController';

// GraphQL: Resolvers
  const RESOLVERS = {
    Query: {

      // Pedir lista de películas
      async allMovies() {
        const movies =  await Movie.find();
        return movies.map( x => {
          let string_id = x._id.toString();
          console.log(x);
          x._id = string_id
          console.log(x);
          return x;
        })
      },

      hola: ((parent, args, context, info) => {
        return `Hola ${args.name || 'mundo'}`;
      })
    },

    Mutation: {

      // Crear película
      async createMovie(root, {input}) {
        return Movie.create(input).then(movie => {
          return movie.toObject()
        }).catch(err => { throw err })
      }
    }
};

// Exports
export default RESOLVERS;