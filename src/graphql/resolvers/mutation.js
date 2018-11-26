// Mongodb Models
import Movie from '../../models/Movie';

export default {

    // Movie
    async createMovie(root, { input }) {
        return await Movie
            .create(input)
            .then(movie => { return movie.toObject() })
            .catch(err => { throw err })
    },

    async updateMovie(root, { id, input }) {
        return await Movie
            .findOneAndUpdate(id, { $set: input }, { new: true })
            .then(updatedMovie => { return updatedMovie })
            .catch(err => { throw err });
    },

    async deleteMovie(root, { id }) {
        return await Movie
            .findByIdAndDelete(id)
            .then(() => 'Eliminado exitosamente')
            .catch(errr => { throw err });
    }
}