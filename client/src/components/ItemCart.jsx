import React from 'react'
import { useOutletContext } from 'react-router-dom';
import styles from './styles.module.scss';

const ItemCart = ({ item }) => {

    const { id, nombre, precio, cantidad, imagen } = item;
    const { addToCart, removeFromCart, deleteFromCart } = useOutletContext();

    return (
        <div className={styles.itemCart}>
            <div className={styles.item}>
                <img src={imagen} alt={nombre}></img>
                <p>{nombre}</p>
                <p className={styles.cantidad}>{cantidad}</p>
                <button onClick={() => addToCart(item)}>Aumentar</button>
                <button onClick={() => removeFromCart(item)}>Disminuir</button>
                <button onClick={() => deleteFromCart(item)}>Eliminar</button>
            </div>
            <div className={styles.item}>
                <p style={{ fontWeight: 'bold' }}>Precio: ${precio.toLocaleString()}</p>
                <p style={{ fontWeight: 'bold' }}>Total: ${(precio * cantidad).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default ItemCart