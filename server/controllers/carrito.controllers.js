const Carrito = require("../model/carrito");
const Producto = require("../model/producto");

const getCarrito = async (req, res) => {
  const productosCarrito = await Carrito.find();

  // const { correo } = req.body;

  // const carritoFiltrado = await Carrito.find({ correo: correo });

  if (productosCarrito) {
    res.json({ productosCarrito });
  } else {
    res.json({ mensaje: "No se encontraron productos en el carrito" });
  }
};

const addCarrito = async (req, res) => {
  const { nombre, imagen, precio, correo } = req.body;

  const camposCompletos = nombre && imagen && precio && correo; //validar que los campos no esten vacios

  const esProducto = await Producto.findOne({ nombre: nombre }); //buscar si existe el producto en la base de datos

  // const estaEnCarrito = await Carrito.findOne({ nombre: nombre });//buscar si el producto ya esta en el carrito

  const carritoFiltrado = await Carrito.find({ correo: correo }); //filtrar carrito del usuario

  const estaEnCarrito = carritoFiltrado
    .map((producto) => producto.correo === correo && producto.nombre === nombre)
    .includes(true);
  const id = carritoFiltrado
    .filter(
      (producto) => producto.correo === correo && producto.nombre === nombre
    )
    .map((producto) => producto._id);
  if (camposCompletos) {
    if (esProducto) {
      if (estaEnCarrito) {
        await Carrito.findByIdAndUpdate(
          id,
          { $inc: { cantidad: 1 } },
          { new: true }
        ).then((producto) =>
          res.json({ mensaje: "Se ha actualizado el producto", producto })
        );
        // res.json({ mensaje: 'El producto ya esta en el carrito' });
      } else {
        const nuevoProductoEnCarrito = new Carrito({
          nombre,
          imagen,
          precio,
          correo,
          cantidad: 1,
        });

        // await Producto.updateOne({ nombre: nombre }, { enCarrito: true }); //actualizar el estado del producto en la base de datos

        await nuevoProductoEnCarrito.save();
        res.json({
          mensaje: "Producto agregado al carrito",
          nuevoProductoEnCarrito,
        });
      }
    } else {
      res.json({ mensaje: "El producto no existe" });
    }
  } else {
    res.json({ mensaje: "Faltan campos por completar" });
  }
};

const updateCarrito = async (req, res) => {
  const { productoId } = req.params;
  const { query } = req.query;
  // const body = req.body;

  const estaEnCarrito = await Carrito.findById(productoId); //buscar si el producto esta en el carrito

  // const { _id } = await Producto.findOne({ nombre: estaEnCarrito.nombre, });//buscar el id del producto en la base de datos

  if (!query) {
    res.status(404).json({ mensaje: "Se debe enviar una query" });
  } else if (estaEnCarrito && query === "agregar") {
    //actualizar el producto en el carrito buscando por ID
    await Carrito.findByIdAndUpdate(
      productoId,
      { $inc: { cantidad: 1 } },
      { new: true }
    ).then((producto) =>
      res.json({ mensaje: "Se ha actualizado el producto", producto })
    );
  } else if (estaEnCarrito && query === "quitar") {
    if (estaEnCarrito.cantidad > 1) {
      //actualizar el producto en el carrito buscando por ID
      await Carrito.findByIdAndUpdate(
        productoId,
        { $inc: { cantidad: -1 } },
        { new: true }
      ).then((producto) =>
        res.json({ mensaje: "Se ha actualizado el producto", producto })
      );
    }
    // else {
    //     //actualizar el estado del producto en la base de datos
    //     // await Producto.findByIdAndUpdate(_id, { enCarrito: false }, { new: true });
    //     //actualizar el producto en la base de datos buscando por nombre
    //     await Carrito.findByIdAndDelete(productoId)
    //         .then((producto) =>
    //             res.json({ mensaje: 'Se ha eliminado el producto del carrito', producto })
    //         );
    // }
  } else {
    res.status(400).json({ mensaje: "El producto no esta en el carrito" });
  }
};

const deleteCarrito = async (req, res) => {
  const { productoId } = req.params;

  const estaEnCarrito = await Carrito.findById(productoId); //buscar si el producto esta en el carrito

  const { _id } = await Producto.findOne({ nombre: estaEnCarrito.nombre }); //buscar el id del producto en la base de datos

  if (estaEnCarrito) {
    await Carrito.findByIdAndDelete(productoId);

    await Producto.findByIdAndUpdate(_id, { enCarrito: false }, { new: true })
      .then((producto) =>
        res.json({
          mensaje: "Se ha eliminado el producto del carrito",
          producto,
        })
      )
      .catch((err) =>
        res
          .status(400)
          .json({ mensaje: "No se ha podido eliminar el producto del carrito" })
      );
  }
};

module.exports = { getCarrito, addCarrito, updateCarrito, deleteCarrito };
