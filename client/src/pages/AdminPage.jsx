import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ProductosAdmin from '../components/ProductosAdmin';
import styles from './styles.module.scss';

const AdminPage = () => {

    const { admin, validarAdmin, usuario, setUsuario, cartItem, productos, getProductosCarrito } = useOutletContext();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            axios
                .get(`http://localhost:4000/admin`, {
                    headers: {
                        acceso: token, // token
                    },
                })
                .then(({ data }) => {
                    setUsuario(data)
                    validarAdmin(data)
                })
                .catch((error) => {
                    console.error(error)
                    navigate('/welcome');
                });
        }
    }, [token]);

    return (
        <>
            {
                admin &&
                < div className={styles.admin} >
                    <div className={styles.agregarProductos}>
                        <button>Agregar Nuevo Producto</button>
                    </div>
                    <div className={styles.adminProductos}>
                        {productos.map((item, i) => (
                            <ProductosAdmin key={i} item={item} />
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default AdminPage;