const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['acceso'];

    if (token) {
        jwt.verify(token, 'secreto', (error, decoded) => {
            if (error) {
                return res.status(400).json({ mensaje: 'Token inválido' });
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(400).json({ mensaje: 'Debes enviar un token' })
    }
};

module.exports = verificarToken;