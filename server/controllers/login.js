const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { correo, contrasena } = req.body;
    Usuario.findOne({ correo }).then((usuario) => {
        if (!usuario) {
            return res.json({ mensaje: 'No se ha encontrado el usuario' });
        } else {
            bcrypt.compare(contrasena, usuario.contrasena, (error, resultado) => {
                if (error) res.json({ error });
                else if (resultado) {
                    const { id, nombre } = usuario;

                    const data = { id, nombre };

                    const token = jwt.sign(data, "secreto", {
                        expiresIn: 60 * 60 * 24,
                    });

                    return res.json({ mensaje: 'Inicio de sesión exitoso', usuario: { id, nombre, token }, resultado: resultado });
                } else {
                    return res.json({ mensaje: 'Contraseña icorrecta', resultado: resultado });
                }
            });
        }
    });
}

module.exports = login;