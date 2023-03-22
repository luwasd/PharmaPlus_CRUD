import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu";
import styles from "./styles.module.scss";
import axios from "axios";
import Swal from "sweetalert2";

const Layout = () => {
  const [usuario, setUsuario] = useState({});
  const [cartItem, setCartItem] = useState([]);
  const [productos, setProductos] = useState([]);
  const [admin, setAdmin] = useState(false);

  const location = useLocation();
  const showMenu = location.pathname !== "/login" && location.pathname !== "/";
  const token = localStorage.getItem("token");

  const getProductos = async () => {
    await axios
      .get("http://localhost:4000/productos")
      .then(({ data }) => setProductos(data.productos));
  };

  const getProductosCarrito = async () => {
    const { correo } = usuario;

    await axios
      .get("http://localhost:4000/productos-carrito", { correo })
      .then(({ data }) => setCartItem(data.productosCarrito))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductos();
    getProductosCarrito();
  }, [cartItem]);

  const addToCart = async (producto) => {
    const { id, nombre, precio, imagen } = producto;

    const { correo } = usuario;

    await axios.post("http://localhost:4000/productos-carrito", {
      nombre,
      precio,
      imagen,
      correo,
    });

    getProductos();
    getProductosCarrito();
  };

  const removeFromCart = async (id, query, cantidad) => {
    if (query === "quitar" && cantidad === 1) {
      await axios
        .delete(`http://localhost:4000/productos-carrito/${id}`)
        .then(({ data }) => console.log(data));
    } else {
      await axios
        .put(`http://localhost:4000/productos-carrito/${id}?query=${query}`)
        .then(({ data }) => console.log(data));
    }
    getProductos();
    getProductosCarrito();
  };

  const deleteFromCart = async (id) => {
    await axios
      .delete(`http://localhost:4000/productos-carrito/${id}`)
      .then(({ data }) => console.log(data));

    getProductos();
    getProductosCarrito();
  };

  const deleteProducto = async (id, nombre, imagen) => {
    Swal.fire({
      html: `<div><img src="${imagen}" width="150"/></div>`,
      title: `¿Desea eliminar el producto ${nombre}?`,
      //text: "We'll miss you!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, quiero eliminarlo.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`http://localhost:4000/productos/${id}`)
          .then(({ data }) => console.log(data));

        getProductos();
        getProductosCarrito();
      }
    });

  };

  const validarAdmin = (usuario) => {
    const { rol } = usuario;
    if (rol === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  return (
    <>
      {showMenu && <Menu usuario={usuario} admin={admin} />}
      <div className={styles.container}>
        <Outlet
          context={{
            admin,
            validarAdmin,
            usuario,
            setUsuario,
            cartItem,
            productos,
            addToCart,
            removeFromCart,
            deleteFromCart,
            getProductos,
            getProductosCarrito,
            deleteProducto,
          }}
        />
      </div>
    </>
  );
};

export default Layout;
