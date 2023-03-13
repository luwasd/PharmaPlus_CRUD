const express = require('express');
const controllers = require('../controllers/login.controllers');
const verificarToken = require('../middlewares/verificarToken');

const loginRouter = () => {
    const router = express.Router();
    //metodos del controlador (post, get, put, delete)
    router.get('/user', verificarToken, controllers.getUserById);
    router.post('/register', controllers.register);
    router.post('/login', controllers.login);
    router.put('/compras', verificarToken, controllers.agregarCompra);

    return router;
};

module.exports = {
    loginRouter,
};
