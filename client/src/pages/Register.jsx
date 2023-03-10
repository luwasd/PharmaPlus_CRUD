import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../layout/styles.module.scss'
import axios from 'axios'

const Register = () => {

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
                    }, 3000);
                })
                .catch((error) => {
                    console.error(error)
                    setMensaje("Error al registrar usuario");
                    setTimeout(() => {
                        setMensaje("");
                        setCargando(false);
                    }, 3000);
                });
        }
    };

    const navigate = useNavigate()
    return (
        <>
            <div className={style.formContainer}>
                <h3>Bienvenido a la pagina</h3>
                <h2>De Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={style.inputBox}>
                            <label htmlFor="nombre">Nombre :</label>
                            <input onChange={handleChange} value={nombre} required minLength={2} type="text" id='nombre' name='nombre' placeholder='Escriba su Nombre...' autoComplete='off' />
                        </div>
                    </div>
                    <div>
                        <div className={style.inputBox}>
                            <label htmlFor="correo">Correo :</label>
                            <input onChange={handleChange} value={correo} required type="email" id='correo' name='correo' placeholder='Escriba su Correo...' autoComplete='off' />
                        </div>
                    </div>
                    <div>
                        <div className={style.inputBox}>
                            <label htmlFor="contrasena">Contraseña :</label>
                            <input onChange={handleChange} value={contrasena} required minLength={5} type="password" id='contrasena' name='contrasena' placeholder='Escriba su Contraseña...' autoComplete='off' />
                        </div>
                    </div>
                    <button type='submit'>{cargando ? "Cargando..." : "Registrarme"}</button>
                    <p>¿Ya tienes una cuenta? <span onClick={() => navigate('/login')}>Inicia Sesion!</span></p>
                </form>
            </div>
            {mensaje && <div className={style.mensajeForm}>{mensaje}</div>}
        </>
    )
}

export default Register