const jwt = require('jsonwebtoken');
require('dotenv').config()

const admin = (req, res, next) => {
    const token = req.headers['acceso'];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            console.log(decoded.rol);
            if (error) {
                return res.status(400).json({ mensaje: 'Token inválido' });
            } else if (decoded.rol !== 'admin') {
                
                return res.status(400).json({ mensaje: 'No tienes permisos para realizar esta acción' });
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(400).json({ mensaje: 'Debes enviar un token' })
    }
};

module.exports = admin;