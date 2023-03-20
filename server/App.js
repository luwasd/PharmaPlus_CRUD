// const express = require('express');
// const cors = require('cors');
// const db = require('./database/db');
// const controllers = require('./controllers/login.controllers');
// const verificarToken = require('./middlewares/verificarToken');

// const app = express();

// app.use(cors());
// app.use(express.json());

// //metodos del controlador (post, get, put, delete)
// app.get('/user', verificarToken, controllers.getUserById);
// app.post('/register', controllers.register);
// app.post('/login', controllers.login);

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//     db();
// });

// module.exports = app;

const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const { loginRouter } = require("./routes/login.routes");
const { productosRouter } = require("./routes/productos.routes");
const { carritoRouter } = require("./routes/carrito.routes");
require("dotenv").config();

const appFactory = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const userRouter = loginRouter();
  const productRouter = productosRouter();
  const cartRouter = carritoRouter();

  app.use(userRouter);
  app.use(productRouter);
  app.use(cartRouter);

  return app;
};

const app = appFactory();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  db();
});
