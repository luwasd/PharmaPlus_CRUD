const { model, Schema } = require('mongoose');

const productoSchema = new Schema({
    nombre: {
        type: String,
        minlength: [2, "El nombre debe tener al menos 2 caracteres"],
        required: [true, "El nombre es obligatorio"],
        unique: [true, "El nombre ya esta en uso"]
    },
    descripcion: {
        type: String,
        minlength: [2, "La descripcion debe tener al menos 2 caracteres"],
        required: [true, "La descripcion es obligatoria"]
    },
    imagen: {
        type: String,
        minlength: [2, "La imagen debe tener al menos 2 caracteres"],
        required: [true, "La imagen es obligatoria"],
    },
    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"]
    },
    enCarrito: { type: Boolean, default: false },
});

module.exports = model('Producto', productoSchema);