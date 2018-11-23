// Configuración de JWT
const jwt = require('jsonwebtoken');

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
        jwt.verify(bearerToken, process.env.VERIFY_SECRET, (err, decoded) => {
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

export default verifyToken;