import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import axios from 'axios'

const Login = () => {
    localStorage.removeItem('token');
    const [inputs, setInputs] = useState({
        correo: "",
        contrasena: ""
    });

    const [mensaje, setMensaje] = useState();
    const [cargando, setCargando] = useState(false);

    const { nombre, correo, contrasena } = inputs;

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (correo !== "" && contrasena !== "") {
            const Data = {
                correo,
                contrasena
            };
            setCargando(true);
            await axios
                .post('http://localhost:4000/login', Data)
                .then(({ data }) => {
                    setMensaje(data.mensaje);
                    setInputs({ correo: "", contrasena: "" });
                    setTimeout(() => {
                        setMensaje("");
                        setCargando(false);
                        console.log(data);
                        localStorage.setItem('token', data?.usuario.token);
                        if (data.resultado) {
                            if (data.usuario.rol === 'admin') {
                                navigate(`/admin`)
                            } else {
                                navigate(`/welcome`)
                            }
                        };
                        console.log(data);
                    }, 2000);
                })
                .catch((error) => {
                    console.error(error)
                    setMensaje("Error al registrar usuario");
                    setTimeout(() => {
                        setMensaje("");
                        setCargando(false);
                    }, 2000);
                });
        }
    };

    const navigate = useNavigate()
    return (
        <>
            <div className={styles.formContainer}>
                <h3>Favor Inicia Sesion para avanzar</h3>
                <h2>Pharma Plus+</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={styles.inputBox}>
                            <label htmlFor="correo">Correo :</label>
                            <input onChange={handleChange} value={correo} required type="email" id='correo' name='correo' placeholder='Escriba su Correo...' autoComplete='off' />
                        </div>
                    </div>
                    <div>
                        <div className={styles.inputBox}>
                            <label htmlFor="contrasena">Contraseña :</label>
                            <input onChange={handleChange} value={contrasena} required minLength={5} type="password" id='contrasena' name='contrasena' placeholder='Escriba su Contraseña...' autoComplete='off' />
                        </div>
                    </div>
                    <button type='submit'>{cargando ? "Cargando..." : "Inisiar Sesión"}</button>
                    <p>¿Aun no tienes una cuenta? <span onClick={() => navigate('/')}> Crear Cuenta!</span></p>
                </form>
            </div>
            {mensaje && <div className={styles.mensajeForm}>{mensaje}</div>}
        </>
    )
}

export default Login;