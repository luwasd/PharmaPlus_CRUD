import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import styles from './styles.module.scss';
import axios from 'axios';


const Layout = () => {
    const [cartItem, setCartItem] = useState([]);
    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        await axios
            .get('http://localhost:4000/productos')
            .then(({ data }) => setProductos(data.productos))
    };

    const getProductosCarrito = async () => {
        await axios
            .get('http://localhost:4000/productos-carrito')
            .then(({ data }) => setCartItem(data.productosCarrito))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getProductos();
        getProductosCarrito();
    }, [cartItem]);

    const addToCart = async (producto) => {
        const { id, nombre, precio, imagen } = producto;

        await axios.post("http://localhost:4000/productos-carrito", { nombre, precio, imagen })

        getProductos();
        getProductosCarrito();
    }

    const removeFromCart = async (id, query, cantidad) => {
        if (query === 'quitar' && cantidad === 1) {
            await axios
                .delete(`http://localhost:4000/productos-carrito/${id}`)
                .then(({ data }) => console.log(data));
        } else {
            await axios
                .put(`http://localhost:4000/productos-carrito/${id}?query=${query}`)
                .then(({ data }) => console.log(data));
        }
        getProductos();
        getProductosCarrito();

    }

    const deleteFromCart = async (id) => {
        await axios
            .delete(`http://localhost:4000/productos-carrito/${id}`)
            .then(({ data }) => console.log(data));

        getProductos();
        getProductosCarrito();
    };

    // const clearCart = () => {
    //     setCartItem([]);
    // };

    return (
        <>
            <Menu />
            <div className={styles.container}>
                <Outlet context={{ cartItem, productos, addToCart, removeFromCart, deleteFromCart }} />
            </div>
        </>
    )
};

export default Layout;