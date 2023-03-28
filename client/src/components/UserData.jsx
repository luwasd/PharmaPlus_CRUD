import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../pages/styles.module.scss";

const UserData = () => {
    const { usuario } = useOutletContext();
    const { compras, nombre, correo, createdAt } = usuario;


    return (
        <div className={styles.welcome}>
            <div className={styles.profileContainer}>
                <div className={styles.profile}>
                    <h2>Datos de usuario</h2>
                    <h3>Nombre: <span>{nombre}</span></h3>
                    <h3>Email: <span>{correo}</span></h3>
                    <h3>Fecha de registro: <span>{createdAt.toString().substring(0, 10)}</span></h3>
                </div>
                <h1 className={styles.h1Historial}>Historial de Compras</h1>
                <div className={styles.purchaseHistory}>
                    {compras.map((item, i) => (
                        <div className={styles.cajaCompra} key={i}>
                            <h3>- Fecha de compra: <span>{item.fecha}</span></h3>
                            <h3>- El total de esta compra fue de <span>{(item.total).toLocaleString()}</span> gs.</h3>
                            <h3>- Estos son los productos que compraste:</h3>
                            {item.userCart.map((item, i) => (
                                <div className={styles.purchase} key={i}>
                                    <div className={styles.purchaseImg}>
                                        <img src={item.imagen} alt={item.nombre} />
                                    </div>
                                    <div className={styles.purchaseData}>
                                        <h4>Nombre: {item.nombre}</h4>
                                        <h4>Precio: {(item.precio).toLocaleString()} gs.</h4>
                                        <h4>Cantidad: {item.cantidad}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserData