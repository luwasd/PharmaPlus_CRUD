import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import axios from 'axios'

const Register = () => {
    localStorage.removeItem('token');
    const [inputs, setInputs] = useState({
        nombre: "",
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
        if (nombre !== "" && correo !== "" && contrasena !== "") {
            const Data = {
                nombre,
                correo,
                contrasena
            };
            setCargando(true);
            await axios
                .post('http://localhost:4000/register', Data)
                .then(({ data }) => {
                    setMensaje(data.mensaje);
                    console.log(mensaje);
                    setInputs({ nombre: "", correo: "", contrasena: "" });
                    setTimeout(() => {
                        setMensaje("");
                        setCargando(false);
                        navigate('/login');
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
                <h3>Bienvenido a la Pagina de Registro de</h3>
                <h2>Pharma Plus+!</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={styles.inputBox}>
                            <label htmlFor="nombre">Nombre :</label>
                            <input onChange={handleChange} value={nombre} required minLength={2} type="text" id='nombre' name='nombre' placeholder='Escriba su Nombre...' autoComplete='off' />
                        </div>
                    </div>
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
                    <button type='submit'>{cargando ? "Cargando..." : "Registrarme"}</button>
                    <p>¿Ya tienes una cuenta? <span onClick={() => navigate('/login')}>Inicia Sesion!</span></p>
                </form>
            </div>
            {mensaje && <div className={styles.mensajeForm}>{mensaje}</div>}
        </>
    )
}

export default Register