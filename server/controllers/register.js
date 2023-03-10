const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario');

const register = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    Usuario.findOne({ correo }).then((usuario) => {
        if (usuario) {
            return res.json({ mensaje: 'Ya existe un usuario con ese correo' });
        } else if (!nombre || !correo || !contrasena) {
            return res.json({ mensaje: 'Todos los campos son obligatorios' });
        } else {
            bcrypt.hash(contrasena, 10, (error, contrasenaHasheada) => {
                if (error) res.json({ error });
                else {
                    const nuevoUsuario = new Usuario({
                        nombre,
                        correo,
                        contrasena: contrasenaHasheada,
                    });
                    
                    nuevoUsuario.save()
                        .then((usuario) => {
                            res.json({ mensaje: "Usuario creado con éxito", usuario })
                        })
                        .catch((error) => console.log(error));
                }
            });
        }
    })
}

module.exports = register;