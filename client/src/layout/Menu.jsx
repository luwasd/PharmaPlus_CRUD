import React from 'react'
import { NavLink } from 'react-router-dom'


const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Register</NavLink>
                <NavLink className="navbar-brand" to="/login">Login</NavLink>
                <NavLink className="navbar-brand" to="/welcome">pagina</NavLink>
            </div>
        </nav>
    )
}

export default Menu