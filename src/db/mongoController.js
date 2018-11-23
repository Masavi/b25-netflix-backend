const mongoose = require('mongoose');
const mongo_uri = `${process.env.DATABASE_URI}`;

mongoose.connect(
    mongo_uri,
    { useNewUrlParser: true },
    (err) => {
        return err 
            ? console.log('Hubo un error al conectar con la bd...')
            : console.log('¡Conexión exitosa con Mongo Atlas!');
    }
);

