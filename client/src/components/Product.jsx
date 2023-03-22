import React from "react";
import { useOutletContext } from "react-router-dom";
import style from "./styles.module.scss";

const Product = () => {
  const { addToCart, productos } = useOutletContext();

  return (
    <div className={style.contenedorProductos}>
      {productos &&
        productos.map((producto, i) => {
          return (
            <div key={i} className={style.producto}>
              <div className={style.contenedorProductosImagen}>
                <img src={producto.imagen} alt={producto.nombre} />
              </div>

              <div className={style.contenedorProductosTexto}>
                <p>
                  {producto.nombre} - {producto.precio.toLocaleString()} gs.
                </p>
                <span>{producto.descripcion}</span>
              </div>
              <div className={style.contenedorProductosButton}>
                <button onClick={() => addToCart(producto)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Product;
