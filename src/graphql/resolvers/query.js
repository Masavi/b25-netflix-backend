// Mongodb Models
import Movie from '../../models/Movie';
import User  from '../../models/User';

export default {

    // User
    async me(_, args, context, info){
        if (!context.user) throw new Error("Es necesario autenticarse");

        return User
            .findById(context.user._id)
            .then(user => {
                console.log( user.toObject() )
                return user.toObject() 
            })
            .catch(err => { throw err; })
    },

    // Movie
    async oneMovie(_, { id }, context, info) {
        return await Movie.findById(id);
    },

    async allMovies() {
        return await Movie.find();
    },
}