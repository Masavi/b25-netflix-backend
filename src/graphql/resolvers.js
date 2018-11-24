// Mongodb Models
import Movie from '../models/Movie';

// GraphQL: Resolvers
  const RESOLVERS = {

    Query: {

      /* hola: ((parent, args, context, info) => {
        return `Hola ${args.name || 'mundo'}`;
      }), */

      async oneMovie(parent, {id}, context, info) {
        return await Movie.findById(id);
      },

      // Pedir lista de películas
      async allMovies() {
        return await Movie.find();
      },
    },

    Mutation: {

      // (parent, args, context, info)
      // Movies
      async createMovie(parent, {input}) {
        return await Movie
                .create(input)
                .then(movie => {return movie.toObject()})
                .catch(err => { throw err })
      },

      async updateMovie(parent, {id, input}) {
        return await Movie
                .findByIdAndUpdate(id, { $set: input }, { new: true })
                .then( updatedMovie => {return updatedMovie})
                .catch(err => { throw err});
      },

      async deleteMovie(parent, {id}) {
        return await Movie
                .findByIdAndDelete(id)
                .then( () => 'Eliminado exitosamente')
                .catch( errr => {throw err});
      }
    }
};


// Exports
export default RESOLVERS;