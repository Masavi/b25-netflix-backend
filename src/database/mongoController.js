const mongoose = require('mongoose');
const mongo_uri = `${process.env.DATABASE_URI}`;

mongoose.connect(
    mongo_uri,
    { useNewUrlParser: true },
    (err) => {
        return err 
            ? console.error(`!!! Error al intentar conectar con el cluster!!!\n${err}`)
            : console.log('¡Conexión exitosa con Mongo Atlas!');
    }
);

export default mongoose;