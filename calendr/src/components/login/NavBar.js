import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../../extras/CalendrWhite.png';


const NavBar = () => {
  return (
    <div className="navBarContainer">
        <img src={logo} alt="Logo"/>
        <h1 className="calendrTitle">CALENDR</h1>
      <div className="nav-buttons">
        <NavLink activeClassName="navbuttonLink" className="navbutton" to="/">Login</NavLink>
      </div>
    </div>
  );
}

export default NavBar
