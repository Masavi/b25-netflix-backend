const mongoose = require('mongoose');
const mongo_uri = 'mongodb+srv://masavi:abc_123_def@holacluster-efwi5.gcp.mongodb.net/test?retryWrites=true';

mongoose.connect(
    mongo_uri,
    { useNewUrlParser: true },
    (err) => {
        return err 
            ? console.log('Hubo un error al conectar con la bd...')
            : console.log('¡Conexión exitosa con Mongo Atlas!');
    }
);

