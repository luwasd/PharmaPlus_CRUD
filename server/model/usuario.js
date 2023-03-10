const { model, Schema } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        minlength: [2, "El nombre debe tener al menos 2 caracteres"],
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        minlength: [5, "El correo debe tener al menos 5 caracteres"],
        unique: [true, "Email ya esta en uso"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Porfavor ingrese un Email valido"
        }
    },
    contrasena: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
    },
});

module.exports = model('Usuario', UsuarioSchema);
