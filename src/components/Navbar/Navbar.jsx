import React from 'react';
import { NavLink } from 'react-router-dom';
// import './../../App.css';
import s from './Navbar.module.css';
// className={({ isActive }) => (isActive ? `${s.activeLink}` : "")} СТИЛИЗАЦИЯ АКТИВНОЙ ССЫЛКИ!!!!
const Navbar = (props) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' className={({ isActive }) => (isActive ? `${s.activeLink}` : "")}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' className={({ isActive }) => (isActive ? `${s.activeLink}` : "")}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news" className={({ isActive }) => (isActive ? `${s.activeLink}` : "")}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music" className={({ isActive }) => (isActive ? `${s.activeLink}` : "")}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/settings" className={({ isActive }) => (isActive ? `${s.activeLink}` : "")}>Settings</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;