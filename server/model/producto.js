const { model, Schema } = require('mongoose');

const productoSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
    enCarrito: { type: Boolean, default: false },
});

module.exports = model('Producto', productoSchema);