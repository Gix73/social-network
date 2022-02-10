import React from 'react';
import './../../App.css';
import logo from './../../img/logo.png'
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <img src={logo}></img>
        </header>
    );
}

export default Header;