import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductosCart from "../components/ProductosCart";
import styles from "./styles.module.scss";

const ProfilePage = () => {
    const { validarAdmin, usuario, setUsuario, cartItem, setCartItem, deleteFromCart } = useOutletContext();
    const { compras, nombre, correo, createdAt } = usuario;
    const [fecha, setFecha] = useState();

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            axios
                .get(`http://localhost:4000/user`, {
                    headers: {
                        acceso: token, // token
                    },
                })
                .then(({ data }) => {
                    setUsuario(data);
                    validarAdmin(data);
                    setFecha(data.createdAt.toString().substring(0, 10));
                    if (data.rol === "admin") {
                        navigate(`/admin`);
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [token]);


    return (
        <>
            <div className={styles.welcome}>
                <div className={styles.profileContainer}>
                    <div className={styles.profile}>
                        <h2>Bienvenido!! Datos del Usuario.</h2>
                        <h3>Nombre: {nombre}</h3>
                        <h3>Email: {correo}</h3>
                        <h3>Fecha de creacion: {fecha}</h3>
                    </div>

                    <div className={styles.purchaseHistory}>
                        <h2>Historial de Compras</h2>
                        {compras.map((item, i) => (
                            <div key={i}>
                                <h3>Total: ${item.total}</h3>
                                <h3>Productos:</h3>
                                {item.userCart.map((item, i) => (
                                    <div className={styles.purchase} key={i}>
                                        <img src={item.imagen} alt={item.nombre} />
                                        <div>
                                            <h4>Nombre: {item.nombre}</h4>
                                            <h4>Precio: ${item.precio}</h4>
                                            <h4>Cantidad: {item.cantidad}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <h2>Tu carrito</h2>
                <div className={styles.cartProducts}>
                    {/* {userCart.map((item, i) => (
                        <ProductosCart key={i} item={item} />
                    ))} */}
                </div>
                <div className={styles.cartFinalizar}>
                    {/* <h2 className={styles.total}>Total: ${total.toLocaleString()}</h2> */}
                    <button onClick={() => completarCompra()}>Completar Compra!</button>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
