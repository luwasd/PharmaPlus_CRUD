import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../layout/styles.module.scss'

const Welcome = () => {

    const [nombre, setNombre] = useState();

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
                .then(({ data }) => setNombre(data.nombre))
                .catch((error) => console.error(error));
        }
    }, [token])


    return (
        <div className={style.welcome}>
            <h3>{nombre ? `Bienvenido ${nombre}!!` : 'No se ha podido ingresar.'}</h3>
            <h2>{nombre ? `Has ingresado correctamente!` : 'Te estamos viendo....'}</h2>
            <div className={style.botones}>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/')}>Register</button>
            </div>
        </div>
    )
}

export default Welcome