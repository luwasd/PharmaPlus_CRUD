import React, { useState } from "react";
import Swal from "sweetalert2";
import "./ContactUs.css";

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailSent = () => {
    Swal.fire(
      "Gracias!",
      `El equipo de Pharma Plus ha recibido tu mensaje. Estaremos en contacto contigo en la brevedad.`,
      "success"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          subject: subject,
          message: message,
        }),
      });

      let data = await res.json();
      console.log(data);

      if (data.status === "success") {
        emailSent();
        setFullName("");
        setEmail("");
        setMessage("");
        setSubject("");
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Oops. Something went wrong. Try again please",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 contact-container">
      <h2 className="mb-3 text-center">Formulario de contacto</h2>
      <p className="text-center">
        Aquí en Pharma Plus apreciamos las sugerencias e ideas, por lo que
        invitamos a los clientes a manifestarlas a través de este formulario.{" "}
      </p>
      <form onSubmit={handleSubmit} className="d-flex row justify-content-center">
        <div className="mb-3 w-100">
          <label className="form-label" htmlFor="subject">
            Tema
          </label>
          <input
            className="form-control text-center"
            type="text"
            id="subject"
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            required
          />
        </div>
        <div className="mb-3 w-100">
          <label className="form-label" htmlFor="fullName">
            Nombre
          </label>
          <input
            className="form-control"
            type="text"
            id="fullName"
            name="fullName"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            required
          />
        </div>
        <div className="mb-3 w-100">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="mb-3 w-100 mb-5">
          <label className="form-label" htmlFor="message">
            Mensaje
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
        </div>
        <div className="text-center ">
          <button className="boton-submit" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
