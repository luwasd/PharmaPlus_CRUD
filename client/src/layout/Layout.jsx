import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';
import styles from './styles.module.scss';


const Layout = () => {
    return (
        <>
            <Menu />
            <div className={styles.container}>
                <Outlet />
            </div>
            <footer className="mb-20">Pie de Pagina</footer>
        </>
    )
};

export default Layout;