import React from 'react';
import './../../App.css';
import logo from './../../img/logo.png'
import s from './Header.module.css'

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src={logo} alt="logo"></img>
        </header>
    );
}

export default Header;