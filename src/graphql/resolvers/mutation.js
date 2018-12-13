// Mongodb Models
import Movie from '../../models/Movie';
import User  from '../../models/User';

// Utilities
import createToken      from '../../utils/createToken';
import comparePasswords from '../../utils/comparePasswords';

// Subscriptions
import pubsub from '../pubsub';

export default {

    // User
    async signup(_, args, context, info){
        return await User
                .create(args.data)
                .then(user => {
                    let token = createToken(user)
                    return { token }
                })
                .catch(err => {
                    throw new Error(err)
                })
    },

    async login(_, args, context, info){
        return await comparePasswords(args.email, args.password)
            .then(token => { return { token } })
            .catch(err => { throw err })
    },

    // Movie
    async createMovie(_, { input }, context) {

        if(!context.user) { throw new Error('Necesitas autenticarte...')}

        return await Movie
            .create(input)
            .then(movie => {
                pubsub.publish('movieAdded', {movieAdded: movie, flag: true})
                return movie.toObject() 
            })
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