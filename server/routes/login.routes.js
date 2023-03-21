const express = require("express");
const controllers = require("../controllers/login.controllers");
const verificarToken = require("../middlewares/verificarToken");
const admin = require("../middlewares/admin");
//Paquete para el nodemailer
const nodemailer = require("nodemailer");

const loginRouter = () => {
  const router = express.Router();
  //metodos del controlador (post, get, put, delete)
  router.get("/admin", admin, controllers.getUserById);
  router.get("/user", verificarToken, controllers.getUserById);
  router.post("/register", controllers.register);
  router.post("/login", controllers.login);
  router.put("/compras", verificarToken, controllers.agregarCompra);
  //Contact Us form
  router.post("/contact", (req, res) => {
    //NODEMAILER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mauribox28@gmail.com",
        pass: "azydnvsljdzdknwt",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: req.body.email,
      subject: req.body.subject,
      to: "mauribox28@gmail.com",
      text: `From ${req.body.email}\n\n${req.body.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log("Email sent");
        res.json({ status: "success" });
      }
    });
  });

  return router;
};

module.exports = {
  loginRouter,
};
