import express from 'express';
const app = express();

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';

// Imports: GraphQL TypeDefs & Resolvers
import Types from './graphql/typedefs/types';
import Query from './graphql/resolvers/query';
import Mutation from './graphql/resolvers/mutation';
import Subscription from './graphql/resolvers/subscription';

const PORT = process.env.PORT || 5000;

// Atlas cluster connection 
import './database/mongoController';

// Apollo Graphql Server
import ApolloServer from './graphql/schema';

// Middleware: GraphQL
ApolloServer.applyMiddleware({ app });

app.get('/', (req, res) => {
    res.send({"message": "Bienvenido"});
});

/* app.listen( PORT, () => {
    console.log(`\n--- Servidor escuchando en el puerto ${PORT} ---`);
}); */

// Wrap the Express server
const ws = createServer(app);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema: makeExecutableSchema({ typeDefs: Types, resolvers: { Query, Mutation, Subscription } })
  }, {
    server: ws,
    path: '/subscriptions',
  });
});