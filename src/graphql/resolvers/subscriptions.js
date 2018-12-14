// Subscriptions Manager
import pubsub from '../pubsub';

export default {
    movieAdded: {
        subscribe: () => pubsub.asyncIterator(['movieAdded']),
    },
}