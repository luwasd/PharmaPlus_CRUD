import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import '../styles/heard.css';

const Heard = () => {
  return (
    <header className='contenedor'>
        <div className='container'>
            <Link to='/'>
                <img className='logo' src={Logo} alt="" />
            </Link>
            <div className='menu d-flex align-items-center gap-5'>
                <Link className='btn btn-outline-success' to='/login'>Login</Link>
                <Link className='btn btn-outline-success' to='/register'>Register</Link>
            </div>
        </div>
    </header>
  );
};

export default Heard;