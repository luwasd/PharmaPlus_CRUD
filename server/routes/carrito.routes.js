const express = require('express');
const controllers = require('../controllers/carrito.controllers');

const carritoRouter = () => {
    const router = express.Router();
    //metodos del controlador (post, get, put, delete)
    router.get('/productos-carrito', controllers.getCarrito);
    router.post('/productos-carrito', controllers.addCarrito);
    router.put('/productos-carrito/:productoId', controllers.updateCarrito);
    router.delete('/productos-carrito/:productoId', controllers.deleteCarrito);

    return router;
};

module.exports = { carritoRouter };