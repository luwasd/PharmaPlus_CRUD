import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const Menu = (props) => {
  const cerrarSesion = () => {
    localStorage.removeItem("token");
  };

  const { usuario, admin } = props;

  return (
    <nav>
      {admin ? (
        <div className={styles.navBar}>
          <h1>{`Perfil administrador de: ${usuario.nombre}`}</h1>
          <div className={styles.navButtons}>
            <NavLink to="/admin">Productos</NavLink>
            <NavLink to="/perfil">Usuarios</NavLink>
            {/* <NavLink to="/cart">Completar Compra!</NavLink> */}
            <NavLink to="/login" onClick={cerrarSesion}>
              Cerrar Sesión
            </NavLink>
          </div>
        </div>
      ) : (
        <div className={styles.navBar}>
          <h1>{`Bienvenido/a a Pharma Plus+, ${usuario.nombre}`}</h1>
          <div className={styles.navButtons}>
            <NavLink to="/welcome">Inicio</NavLink>
            <NavLink to="/perfil">Perfil</NavLink>
            <NavLink to="/cart">Finalizar compra</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
            <NavLink to="/login" onClick={cerrarSesion}>
              Cerrar sesión
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;
