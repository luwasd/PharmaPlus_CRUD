import React from 'react'
import { useOutletContext } from 'react-router-dom';
import styles from '../pages/styles.module.scss';


const ProductosCart = ({ item }) => {
    // console.log(item);
    const { _id, nombre, imagen, precio, cantidad } = item;
    const { removeFromCart, deleteFromCart } = useOutletContext();


    return (
        <div className={styles.itemCart}>
            <div className={styles.item}>
                <img src={imagen} alt={nombre}></img>
                <p>{nombre}</p>
                <p className={styles.cantidad}>{cantidad}</p>
                <button onClick={() => removeFromCart(_id, "agregar", cantidad)}>Aumentar</button>
                <button onClick={() => removeFromCart(_id, "quitar", cantidad)}>Disminuir</button>
                <button onClick={() => deleteFromCart(_id)}>Eliminar</button>
            </div>
            <div className={styles.item}>
                <p style={{ fontWeight: 'bold' }}>Precio: ${precio.toLocaleString()}</p>
                <p style={{ fontWeight: 'bold' }}>Total: ${(precio * cantidad).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default ProductosCart;