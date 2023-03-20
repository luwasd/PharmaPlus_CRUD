import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ProductosAdmin from '../components/ProductosAdmin';
import styles from './styles.module.scss';

const AdminPage = () => {

    const { admin, validarAdmin, usuario, setUsuario, cartItem, productos, getProductosCarrito } = useOutletContext();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [mensaje, setMensaje] = useState();
    const [cargando, setCargando] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
        precio: 0
    });
    const { nombre, descripcion, imagen, precio } = nuevoProducto;

    const handleChange = (e) => {
        setNuevoProducto({
            ...nuevoProducto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => { // agregar producto
        e.preventDefault();
        setCargando(true);
        console.log(nuevoProducto);
        await axios
            .post('http://localhost:4000/productos', nuevoProducto)
            .then(({ data }) => {
                console.log(data)
                setMensaje(data.mensaje);
                setTimeout(() => {
                    setMostrarFormulario(false)
                    setNuevoProducto({
                        nombre: '',
                        descripcion: '',
                        imagen: '',
                        precio: 0
                    })
                    setCargando(false);
                    setMensaje("");
                }, 2000);
            })
            .catch((error) => {
                console.error(error)
                setMensaje(error.response.data.errors);
                setTimeout(() => {
                    setMensaje("");
                    setCargando(false);
                }, 2000);
            })
    }

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
                        <button onClick={() => setMostrarFormulario(true)}>Agregar Nuevo Producto</button>
                    </div>
                    <div className={styles.adminProductos}>
                        {productos.map((item, i) => (
                            <ProductosAdmin key={i} item={item} />
                        ))}
                    </div>
                    {mostrarFormulario && (
                        <div className={styles.productFormContainer}>
                            <h3>Ingrese los datos del Nuevo Producto</h3>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="nombre">Nombre :</label>
                                        <input onChange={handleChange} value={nombre} required minLength={2} type="text" id='nombre' name='nombre' placeholder='Escriba el nombre del Producto...' autoComplete='off' />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="descripcion">Descripcion :</label>
                                        <input onChange={handleChange} value={descripcion} required minLength={2} type="text" id='descripcion' name='descripcion' placeholder='Escriba la Accion Terapeutica del Producto...' autoComplete='off' />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="imagen">Imagen :</label>
                                        <input onChange={handleChange} value={imagen} required minLength={5} type="text" id='imagen' name='imagen' placeholder='Escriba el link a la Imagen del Producto...' autoComplete='off' />
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.inputBox}>
                                        <label htmlFor="precio">Precio :</label>
                                        <input onChange={handleChange} value={precio} required minLength={2} type="number" id='precio' name='precio' placeholder='Ingrese Precio de venta del Producto...' autoComplete='off' />
                                    </div>
                                </div>
                                <button type='submit'>{cargando ? "Cargando..." : "Agregar"}</button>
                                <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                            </form>
                        </div>
                    )}
                </div>
            }
            {mensaje && <div className={styles.mensajeForm}>{mensaje}</div>}
        </>
    )
}

export default AdminPage;