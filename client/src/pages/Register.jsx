import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from "axios";

const Register = () => {
  localStorage.removeItem("token");
  const [inputs, setInputs] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [mensaje, setMensaje] = useState();
  const [cargando, setCargando] = useState(false);

  const { nombre, correo, contrasena, confirmarContrasena } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nombre !== "" &&
      correo !== "" &&
      contrasena !== "" &&
      confirmarContrasena !== ""
    ) {
      // if (contrasena !== confirmarContrasena) {
      //     setMensaje("Las contraseñas deben ser iguales"); //
      //     setTimeout(() => {
      //         setMensaje("");
      //         setCargando(false);
      //     }, 2000);
      //     return;
      // }
      const Data = {
        nombre,
        correo,
        contrasena,
        confirmarContrasena,
      };
      setCargando(true);
      await axios
        .post("http://localhost:4000/register", Data)
        .then(({ data }) => {
          setMensaje(data.mensaje);
          console.log(mensaje);
          setInputs({
            nombre: "",
            correo: "",
            contrasena: "",
            confirmarContrasena: "",
          });
          setTimeout(() => {
            setMensaje("");
            setCargando(false);
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.errors);
          setMensaje(error.response.data.errors.confirmarContrasena.message);
          setTimeout(() => {
            setMensaje("");
            setCargando(false);
          }, 2000);
        });
    }
  };

  const navigate = useNavigate();
  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <h3>Bienvenido a la página de registro de</h3>
        <h2>Pharma Plus+</h2>
        <form onSubmit={handleSubmit} className={styles.formModifier}>
          <div>
            <div className={styles.inputBox}>
              <label htmlFor="nombre">Nombre y apellido: </label>
              <input
                onChange={handleChange}
                value={nombre}
                required
                minLength={2}
                type="text"
                id="nombre"
                name="nombre"
                //placeholder="Escriba aquí su nombre y apellido"
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <div className={styles.inputBox}>
              <label htmlFor="correo">Email: </label>
              <input
                onChange={handleChange}
                value={correo}
                required
                type="email"
                id="correo"
                name="correo"
                //placeholder="Escriba su email"
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <div className={styles.inputBox}>
              <label htmlFor="contrasena">Contraseña: </label>
              <input
                onChange={handleChange}
                value={contrasena}
                required
                minLength={5}
                type="password"
                id="contrasena"
                name="contrasena"
                //placeholder="Escriba su contraseña"
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <div className={styles.inputBox}>
              <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
              <input
                onChange={handleChange}
                value={confirmarContrasena}
                required
                minLength={5}
                type="password"
                id="confirmarContrasena"
                name="confirmarContrasena"
                //placeholder="Escriba nuevamente su contraseña"
                autoComplete="off"
              />
            </div>
          </div>
          <button type="submit" className={styles.btnContainer}>
            {cargando ? "Cargando..." : "Registrarme"}
          </button>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <span onClick={() => navigate("/login")}>Inicia sesión</span>
          </p>
        </form>
      </div>
      {mensaje && <div className={styles.mensajeForm}>{mensaje}</div>}
    </div>
  );
};

export default Register;
