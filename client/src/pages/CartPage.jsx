import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ProductosCart from '../components/ProductosCart';
import styles from './styles.module.scss';

const CartPage = () => {

    const { usuario, setUsuario, cartItem, getProductos, getProductosCarrito } = useOutletContext();
    const { correo } = usuario;

    const userCart = cartItem.filter((item) => item.correo === correo);

    const total = userCart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            axios
                .get(`http://localhost:4000/user`, {
                    headers: {
                        acceso: token, // token
                    },
                })
                .then(({ data }) => setUsuario(data))
                .catch((error) => console.error(error));
        }
    }, [token])

    return (
        <>
            <div className={styles.welcome}>
                <h2>Tu carrito</h2>
                <div className={styles.cartProducts}>
                    {userCart.map((item, i) => (
                        <ProductosCart key={i} item={item} />
                    ))}
                </div>
                <h2 className={styles.total}>Total: ${total.toLocaleString()}</h2>
            </div>
        </>
    )
}

export default CartPage