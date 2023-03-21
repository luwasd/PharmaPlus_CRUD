import React, { useState } from "react";
import Swal from 'sweetalert2';

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailSent = () => {
    Swal.fire(
      'Thanks!',
      `Great, the team received your message. We will reach you as soon as possible`,
      'success',
      
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch(process.env.REACT_APP_BACKEND + "/api/contact", {
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

      if(data.status === "success"){
        emailSent();
        setFullName("");
        setEmail("");
        setMessage("");
        setSubject("");
      }else{
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: "Oops. Something went wrong. Try again please",
      })
      }

    }catch(error){
      console.log(error)
    }
  };

  

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-3">Contact Form</h2>
        <form onSubmit={handleSubmit} >
        <div className="mb-3">
            <label className="form-label" htmlFor="subject">
              Subject
            </label>
            <input
              className="form-control"
              type="text"
              id="subject"
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="fullName">
              Name
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
          <div className="mb-3">
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
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              Message
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
          <button className="btn btn-danger" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
