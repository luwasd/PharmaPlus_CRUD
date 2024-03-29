const express = require("express");
const controllers = require("../controllers/productos.controllers");
const admin = require("../middlewares/admin");


const productosRouter = () => {
  const router = express.Router();
  //metodos del controlador (post, get, put, delete)
  router.get("/productos", controllers.getProductos);
  router.post("/productos", controllers.addProductos); //aun no se usa pero quiero agreagar mas adelante manejo de stcok y agregar productos
  router.delete('/productos/:productoId', controllers.deleteProducto); 
  router.put('/productos/:productoId', controllers.updateProducto); 
  // router.put('/:id', controllers.update);

  return router;
};

module.exports = { productosRouter };
