const express = require('express');
const controllers = require('../controllers/productos.controllers');

const productosRouter = () => {
    const router = express.Router();
    //metodos del controlador (post, get, put, delete)
    router.get('/productos', controllers.getProductos);
    // router.post('/', controllers.create); aun no se usa pero quiero agreagar mas adelante manejo de stcok y agregar productos
    // router.put('/:id', controllers.update);
    // router.delete('/:id', controllers.remove);

    return router;
};

module.exports = { productosRouter };