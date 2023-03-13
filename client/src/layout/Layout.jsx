import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import styles from './styles.module.scss';
import axios from 'axios';


const Layout = () => {
    const [cartItem, setCartItem] = useState(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    })
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem));
        console.log(cartItem);
    }, [cartItem]);

    const addToCart = (product) => {

        const inCart = cartItem.find((item) => item.id === product.id); //verifica si el producto ya esta en el carrito

        if (inCart) { //si el producto ya esta en el carrito, se suma 1 a la cantidad
            setCartItem(
                cartItem.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, cantidad: item.cantidad + 1 };
                    } else {
                        return item;
                    }
                })
            );
        } else { //si el producto no esta en el carrito, se agrega al carrito
            setCartItem([...cartItem, { ...product, cantidad: 1 }]);
        }
    }

    const removeFromCart = (product) => {
        const inCart = cartItem.find((item) => item.id === product.id);

        if (inCart.cantidad === 1) {
            setCartItem(cartItem.filter((item) => item.id !== product.id));
        } else {
            setCartItem(cartItem.map((item) => {
                if (item.id === product.id) {
                    return { ...item, cantidad: item.cantidad - 1 };
                } else {
                    return item;
                }
            })
            );
        }
    }

    const deleteFromCart = (product) => {
        setCartItem(cartItem.filter((item) => item.id !== product.id));
    };

    const clearCart = () => {
        setCartItem([]);
    };

    return (
        <>
            <Menu />
            <div className={styles.container}>
                <Outlet context={{ cartItem, addToCart, removeFromCart, deleteFromCart, clearCart }} />
            </div>
        </>
    )
};

export default Layout;