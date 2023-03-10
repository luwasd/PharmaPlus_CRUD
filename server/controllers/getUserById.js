const Usuario = require('../model/usuario');

const getUserById = async (req, res) => {
    const { userId } = req.params;

    if (userId.length !== 24) {
        return res.json({ mensaje: 'Contraseña icorrecta' });
    } else {
        Usuario.findById(userId).then((usuario) => {
            if (!usuario) {
                return res.json({ mensaje: 'No se ha encontrado el usuario' });
            } else {
                const { contrasena, _id, __v, ...resto } = usuario._doc;
                return res.json( resto );
            }
        });
    }
};

module.exports = getUserById;