const bcrypt = require("bcrypt");
const Usuario = require("../model/usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserById = async (req, res) => {
  const userId = req.user.id;

  if (userId.length !== 24) {
    return res.json({ mensaje: "Contraseña incorrecta." });
  } else {
    Usuario.findById(userId).then((usuario) => {
      if (!usuario) {
        return res.json({ mensaje: "No se ha encontrado el usuario." });
      } else {
        const { contrasena, _id, __v, ...resto } = usuario._doc;
        return res.json(resto);
      }
    });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;
  Usuario.findOne({ correo }).then((usuario) => {
    if (!usuario) {
      return res.json({ mensaje: "No se ha encontrado el usuario." });
    } else {
      bcrypt.compare(contrasena, usuario.contrasena, (error, resultado) => {
        if (error) res.json({ error });
        else if (resultado) {
          const { id, nombre, rol } = usuario;

          const data = { id, nombre, rol };

          const token = jwt.sign(data, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24,
          });

          return res.json({
            mensaje: "Inicio de sesión exitoso",
            usuario: { id, nombre, rol, token },
            resultado: resultado,
          });
        } else {
          return res.json({
            mensaje: "Datos incorrectos.",
            resultado: resultado,
          });
        }
      });
    }
  });
};

const register = async (req, res) => {
  const { nombre, correo, contrasena, confirmarContrasena } = req.body;
  // if (contrasena !== confirmarContrasena) {
  //     return res.json({ mensaje: 'Las contraseñas no coinciden' });
  // }
  Usuario.findOne({ correo }).then((usuario) => {
    if (usuario) {
      return res.json({ mensaje: "Ya existe un usuario con ese correo." });
    } else if (!nombre || !correo || !contrasena || !confirmarContrasena) {
      return res.json({ mensaje: "Todos los campos son obligatorios." });
    } else {
      // bcrypt.hash(contrasena, 10, (error, contrasenaHasheada) => {
      //     if (error) res.json({ error });
      //     else {
      //         const nuevoUsuario = new Usuario({
      //             nombre,
      //             correo,
      //             contrasena: contrasenaHasheada,
      //         });

      //         nuevoUsuario.save()
      //             .then((usuario) => {
      //                 res.json({ mensaje: "Usuario creado con éxito", usuario })
      //             })
      //             .catch((error) => console.log(error));
      //     }
      // });
      const nuevoUsuario = new Usuario({
        nombre,
        correo,
        contrasena,
        confirmarContrasena,
      });
      nuevoUsuario
        .save()
        .then((usuario) => {
          res.json({ mensaje: "Usuario creado con éxito!", usuario });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json(error);
        });
    }
  });
};

const agregarCompra = async (req, res) => {
  const userId = req.user.id;
  const { userCart, total } = req.body;
  const compra = { userCart, total };
  Usuario.findById(userId).then((usuario) => {
    if (!usuario) {
      return res.json({ mensaje: "No se ha encontrado el usuario." });
    } else {
      usuario.compras.push(compra);
      usuario
        .save()
        .then((usuario) => {
          res.json({ mensaje: "Compra agregada con éxito!", usuario });
        })
        .catch((error) => console.log(error));
    }
  });
};

module.exports = { getUserById, login, register, agregarCompra };
