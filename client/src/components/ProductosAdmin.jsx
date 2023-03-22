import axios from "axios";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./styles.module.scss";

const ProductosAdmin = ({ item }) => {
  const { _id, nombre, descripcion, imagen, precio, cantidad } = item;
  const { deleteProducto, getProductos } = useOutletContext();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoPrecio, setNuevoPrecio] = useState(0);

  const handleChange = (e) => {
    setNuevoPrecio(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      html: `<div><img src="${imagen}" width="150"/></div>`,
      title: `¿Desea confirmar el nuevo precio del producto a ${nuevoPrecio}?`,
      //text: "We'll miss you!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, quiero modificar.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .put(`http://localhost:4000/productos/${_id}`, { precio: nuevoPrecio })
          .then(({ data }) => {
            console.log(data);
            setMostrarFormulario(false);
            setNuevoPrecio("");
            getProductos();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className={styles.cajaItem}>
      <img src={imagen} alt={nombre}></img>
      <div className={styles.datosProducto}>
        <div className={styles.superior}>
          <p>{nombre}</p>
          <p>{descripcion}</p>
          {/* <p className={styles.stock}>
            Stock: <span className={styles.cantidad}>1</span>
          </p> */}
          <p style={{ fontWeight: "bold" }}>
            Precio: {precio.toLocaleString()} gs.
          </p>
        </div>
        <div className={styles.superior}>
          <button onClick={() => deleteProducto(_id, nombre, imagen)} className={styles.deleteBtn}>
            Eliminar Producto
          </button>
          <button onClick={() => setMostrarFormulario(true)} className={styles.editBtn}>
            Modificar Precio
          </button>
        </div>
      </div>
      {mostrarFormulario && (
        <div className={styles.productFormContainer}>
          <h3>Ingrese el nuevo precio del producto</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <div className={styles.inputBox}>
                <label htmlFor="precio">Precio :</label>
                <input
                  onChange={handleChange}
                  value={nuevoPrecio}
                  required
                  minLength={2}
                  type="number"
                  id="nuevoPrecio"
                  name="nuevoPrecio"
                  //placeholder="Ingrese Precio de venta del Producto..."
                  autoComplete="off"
                />
              </div>
            </div>
            <div className={styles.btnsContainer}>
              <button type="submit">Aceptar</button>
              <button onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductosAdmin;
