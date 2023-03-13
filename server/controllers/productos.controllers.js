const Producto = require('../model/producto');

const getProductos = async (req, res) => {
    const productos = await Producto.find();

    if (productos) {
        res.json({productos});
    } else {
        res.json({ mensaje: 'No se encontraron productos' });
    }
};

module.exports = { getProductos };