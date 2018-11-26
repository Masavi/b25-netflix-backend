// Mongodb Models
import Movie from '../../models/Movie';

export default {

    // Movie
    async oneMovie(root, { id }, context, info) {
        return await Movie.findById(id);
    },

    async allMovies() {
        return await Movie.find();
    },
}