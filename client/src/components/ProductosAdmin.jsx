import React from 'react'
import { useOutletContext } from 'react-router-dom';
import styles from './styles.module.scss';

const ProductosAdmin = ({ item }) => {

    const { _id, nombre, descripcion, imagen, precio, cantidad } = item;
    const { removeFromCart, deleteFromCart } = useOutletContext();

    return (
        <div className={styles.cajaItem}>
            <img src={imagen} alt={nombre}></img>
            <div className={styles.datosProducto}>
                <div className={styles.superior}>
                    <p>{nombre}</p>
                    <p>{descripcion}</p>
                    <p className={styles.stock}>Stock: <span className={styles.cantidad}>1</span></p>
                </div>
                <div className={styles.superior}>
                    <button onClick={() => removeFromCart(_id, "agregar", cantidad)}>Ingreso de Stock</button>
                    <button onClick={() => removeFromCart(_id, "quitar", cantidad)}>Modificar Precio</button>
                    <p style={{ fontWeight: 'bold' }}>Precio: ${precio.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductosAdmin