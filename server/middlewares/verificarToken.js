const jwt = require('jsonwebtoken');
require('dotenv').config()

const verificarToken = (req, res, next) => {
    const token = req.headers['acceso'];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(400).json({ mensaje: 'Token inválido.' });
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(400).json({ mensaje: 'Debes enviar un token.' })
    }
};

module.exports = verificarToken;