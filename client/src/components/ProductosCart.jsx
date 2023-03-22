import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./styles.module.scss";

const ProductosCart = ({ item }) => {
  // console.log(item);
  const { _id, nombre, imagen, precio, cantidad } = item;
  const { removeFromCart, deleteFromCart } = useOutletContext();

  return (
    <div className={styles.itemCartExpanded}>
      <div className={styles.item}>
        <img src={imagen} alt={nombre}></img>
        <p>{nombre}</p>
        <p className={styles.cantidad}>{cantidad}</p>
        <div className={styles.btnCantidadContainer}>
          <button onClick={() => removeFromCart(_id, "agregar", cantidad)}>
            Aumentar
          </button>
          <button onClick={() => removeFromCart(_id, "quitar", cantidad)}>
            Disminuir
          </button>
          <button onClick={() => deleteFromCart(_id)}>Eliminar</button>
        </div>
      </div>
      <div className={styles.item}>
        <p>
          Precio: {precio.toLocaleString()} gs.
        </p>
        <p>
          Total: {(precio * cantidad).toLocaleString()} gs.
        </p>
      </div>
    </div>
  );
};

export default ProductosCart;
