import pubsub from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

export default {
    movieAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('messageAdded'),
      (payload, variables) => {
        return payload.flag === variables.flag;
      }
    )
  }
}