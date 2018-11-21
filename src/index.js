const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const SECRET = require('./utils/config');

const PORT =  process.env.PORT || 5000;

const setDecodedToken = (req, decodedToken, next) => {
    req.decodedToken = decodedToken;
    next();
};

let verifyToken = (req, res, next) => {

    const bearerToken = req.headers['authorization'];

    return bearerToken
        ? jwt.verify(bearerToken, SECRET.verifySecret, (err, decoded) => {
            return err
                ? res.status(401).send({
                    "message": "la autentificación falló..."
                })
                : setDecodedToken(req, decoded, next); 
            
        })
        : res.status(401).send({
            "message": "no tienes permisos"
        });

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});