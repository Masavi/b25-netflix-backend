// Express application configuration
import express from 'express';
const app = express();

// Websocket configuration
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

// Schema creation
const { makeExecutableSchema } = require('graphql-tools')

// Imports: GraphQL TypeDefs & Resolvers
import TypeDefs from './graphql/typedefs/types';
import Query from './graphql/resolvers/query';
import Mutation from './graphql/resolvers/mutation';
import Subscription from './graphql/resolvers/subscriptions';

const schema = makeExecutableSchema({
    typeDefs: TypeDefs,
    resolvers: { Query, Mutation, Subscription },
});

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

// Turn On Server...
ws.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
        execute,
        subscribe,
        schema: schema
    }, {
            server: ws,
            path: '/subscriptions',
    });
});