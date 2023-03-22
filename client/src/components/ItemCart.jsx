import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./styles.module.scss";

const ItemCart = ({ item }) => {
  // console.log(item);
  const { _id, nombre, imagen, precio, cantidad } = item;
  const { removeFromCart, deleteFromCart } = useOutletContext();

  return (
    <div className={styles.itemCart}>
      <div className={styles.item}>
        <img src={imagen} alt={nombre}></img>
        <p>{nombre}</p>
        <p className={styles.cantidad}>{cantidad}</p>
        <div className={styles.btnCantidadContainer}>
          <button
            onClick={() => removeFromCart(_id, "agregar", cantidad)}
            data-toggle="tooltip"
            data-placement="top"
            title="Mayor cantidad"
            className={styles.btnCantidad}
          >
            +
          </button>
          <button
            onClick={() => removeFromCart(_id, "quitar", cantidad)}
            data-toggle="tooltip"
            data-placement="top"
            title="Menos cantidad"
            className={styles.btnCantidad}
          >
            -
          </button>
          <button
            onClick={() => deleteFromCart(_id)}
            data-toggle="tooltip"
            data-placement="top"
            title="Eliminar del carrito"
          >
            X
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <p style={{ fontWeight: "bold" }}>
          Precio: {precio.toLocaleString()} gs.
        </p>
        <p style={{ fontWeight: "bold" }}>
          Total: {(precio * cantidad).toLocaleString()} gs.
        </p>
      </div>
    </div>
  );
};

export default ItemCart;
