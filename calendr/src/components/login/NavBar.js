import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../extras/CalendrWhite.png';
import '../general/NavBar.scss';

// Navigation page pre-login
const NavBar = () => {
  return (
    <div className="navBarContainer">
    <div className="margin">
        <img src={logo} alt="Logo"/>
        <div className="calendrTitleContainer">
        <h1 className="calendrTitle">CALENDR</h1>
        </div>
      <div className="nav-buttons">
        <NavLink activeClassName="navbuttonLink" className="navbutton" to="/login">Login</NavLink>
      </div>
    </div>
    </div>
  );
}

export default NavBar
