const { model, Schema } = require("mongoose");

const carritoSchema = new Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  precio: { type: Number, required: true },
  correo: { type: String, required: true },
  cantidad: { type: Number, required: true },
});

module.exports = model("Carrito", carritoSchema);
