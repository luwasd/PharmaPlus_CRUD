require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const { loginRouter } = require("./routes/login.routes");
const { productosRouter } = require("./routes/productos.routes");
const { carritoRouter } = require("./routes/carrito.routes");

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

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  return app;
};



const app = appFactory();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  db();
});
