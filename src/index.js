import express from 'express';
const app = express();

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

app.listen( PORT, () => {
    console.log(`\n--- Servidor escuchando en el puerto ${PORT} ---`);
});