const express = require('express');
const app = express();
// Se encarga de la conexión con base de datos...
require('./db/mongoController');
const jwt = require('jsonwebtoken');
const SECRET = require('./utils/config');

const PORT =  process.env.PORT || 5000;

let verifyToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];

    console.log(req.headers);

    if (typeof bearerHeader !== 'undefined') {
        // Dividir en cada espacio
        const bearer = bearerHeader.split(' ');
        console.log(bearer);

        // Sacar el token
        const bearerToken = bearer[1];

        // Verificación del token
        jwt.verify(bearerToken, SECRET.verifySecret, (err, decoded) => {
            if (!err) {

                // Incorporación del token a la petición del cliente
                req.token = bearerToken;

                // Utilizando el middleware de Next
                next();
            } else {
                res.status(401).send({
                    "message": "la autentificación falló..."
                });
            }
        });
    } else {
        res.status(401).send({
            "message": "no tienes permisos"
        });
    }
}

app.get('/', (req, res)=>{
    res.send({
        "menssage": "ok"
    });
});

app.post('/api/posts', verifyToken ,(req, res) => {

    res.send({
        "message": "Post created..."
    });
});

app.post('/api/login', (req, res) => {
    
    // dummy user
    const user = {
        "name": "Mauricio",
        "last_name": "Saavedra",
        "mail": "mauricio@mail.com"
    }

    //jwt.sign({user:user})
    jwt.sign({user}, SECRET.verifySecret, ( err, token ) => {
        res.send({
            "message": "logged-in succesfully",
            "userData": user,
            "token": token
        });
    })
});

const Movie = require('./models/Movie');

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});