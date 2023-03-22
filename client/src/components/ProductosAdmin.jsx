import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./styles.module.scss";

const ProductosAdmin = ({ item }) => {
  const { _id, nombre, descripcion, imagen, precio, cantidad } = item;
  const { deleteProducto } = useOutletContext();

  return (
    <div className={styles.cajaItem}>
      <img src={imagen} alt={nombre}></img>
      <div className={styles.datosProducto}>
        <div className={styles.superior}>
          <p>{nombre}</p>
          <p>{descripcion}</p>
          {/* <p className={styles.stock}>
            Stock: <span className={styles.cantidad}>1</span>
          </p> */}
          <p style={{ fontWeight: "bold" }}>
            Precio: ${precio.toLocaleString()}
          </p>
        </div>
        <div className={styles.superior}>
          <button onClick={() => deleteProducto(_id)}>
            Eliminar Producto
          </button>
          <button >
            Modificar Precio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductosAdmin;
