const Producto = require('../model/producto');

const getProductos = async (req, res) => {
    const productos = await Producto.find();

    if (productos) {
        res.json({ productos });
    } else {
        res.json({ mensaje: 'No se encontraron productos' });
    }
};

const addProductos = async (req, res) => {
    const { nombre, descripcion, imagen, precio } = req.body;

    const camposCompletos = nombre && descripcion && imagen && precio; //validar que los campos no esten vacios

    const esProducto = await Producto.findOne({ nombre: nombre });//buscar si existe el producto en la base de datos

    if (camposCompletos) {
        if (!esProducto) {
            const nuevoProducto = new Producto({
                nombre,
                descripcion,
                imagen,
                precio,
            });

            nuevoProducto.save();
            res.json({ mensaje: 'Producto agregado', nuevoProducto });

        } else {
            res.json({ mensaje: 'El producto ya existe' });
        }
    } else {
        res.json({ mensaje: 'Faltan campos por completar' });
    }

};

const deleteProducto = async (req, res) => {
    const { productoId } = req.params;

    const esProducto = await Producto.findById(productoId); //buscar si existe el producto en la base de datos

    if (esProducto) {
        await Producto.findByIdAndDelete(productoId)
            .then(() =>
                res.json({
                    mensaje: "Se ha eliminado el producto con exito",
                })
            )
            .catch((err) =>
                res
                    .status(400)
                    .json({ mensaje: "No se ha podido eliminar el producto" })
            );
    } else {
        res.json({ mensaje: "El producto no existe" });
    }
};

module.exports = { getProductos, addProductos, deleteProducto };