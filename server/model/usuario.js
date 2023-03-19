const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

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
    compras: {
        type: Array,
        default: [],
        required: [true, "Las compras son obligatorias"],
    },
    rol: {
        type: String,
        default: "cliente",
        required: [true, "El rol es obligatorio"],
    },
}, { timestamps: true, versionKey: false });

UsuarioSchema.virtual('confirmarContrasena')
    .get(() => this._confirmarContrasena)
    .set((value) => this._confirmarContrasena = value);

UsuarioSchema.pre('validate', function (next) {
    if ((this.isModified('contrasena') || this.isModified('confirmarContrasena'))
        && this.contrasena !== this.confirmarContrasena) {
        this.invalidate('confirmarContrasena', 'Las contraseñas deben ser iguales');
    }
    next();
});

UsuarioSchema.pre('save', function (next) {
    bcrypt.hash(this.contrasena, 10)
        .then((hash) => {
            this.contrasena = hash;
            next();
        });
});

module.exports = model('Usuario', UsuarioSchema);
