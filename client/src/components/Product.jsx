import React from 'react'
import { useOutletContext } from 'react-router-dom';
import style from './styles.module.scss'

const Product = () => {
  const { addToCart, productos } = useOutletContext();

  return (
    <div className={style.contenedorProductos}>
      {productos &&
        productos.map((producto, i) => {
          return (
            <div key={i} className={style.producto}>
              <img src={producto.imagen} alt={producto.nombre} />
              <div>
                <p>{producto.nombre} - ${(producto.precio).toLocaleString()}</p>
                <p>{producto.descripcion}</p>
              </div>
              <button onClick={() => addToCart(producto)}>Agregar al carrito</button>
            </div>
          )
        })}
    </div>
  )
}

export default Product;