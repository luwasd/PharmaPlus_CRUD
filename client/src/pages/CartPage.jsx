import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductosCart from "../components/ProductosCart";
import styles from "./styles.module.scss";

const CartPage = () => {
  const {
    validarAdmin,
    usuario,
    setUsuario,
    cartItem,
    setCartItem,
    deleteFromCart,
  } = useOutletContext();
  const { correo } = usuario;

  const userCart = cartItem.filter((item) => item.correo === correo);

  const total = userCart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const completarCompra = () => {
    // se envia el carrito del usuario y el total a la base de datos, y se guarda en la tabla compras, para un historico de compras del usuario
    if (!token) {
      navigate("/login");
    } else {
      const fecha = new Date().toLocaleString();
      axios
        .put(
          `http://localhost:4000/compras`,
          { userCart, total, fecha },
          {
            headers: {
              acceso: token, // token
            },
          }
        )
        .then(({ data }) => console.log(data))
        .catch((error) => console.error(error));
    }
    // se eliminan los productos del carrito del usuario
    userCart.forEach((item) => {
      deleteFromCart(item._id);
    });

    navigate("/welcome");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:4000/user`, {
          headers: {
            acceso: token, // token
          },
        })
        .then(({ data }) => {
          setUsuario(data);
          validarAdmin(data);
          if (data.rol === "admin") {
            navigate(`/admin`);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <>
      <div className={styles.welcome}>
        <h2>Tu carrito</h2>
        <div className={styles.cartProducts}>
          {userCart.map((item, i) => (
            <ProductosCart key={i} item={item} />
          ))}
        </div>
        <div className={styles.cartFinalizar}>
          <div>
          <span>Total: {total.toLocaleString()} gs.</span>
          </div>
          
          <button onClick={() => completarCompra()}>Completar Compra!</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
