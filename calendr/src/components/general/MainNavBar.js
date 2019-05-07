import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../extras/CalendrWhite.png";
import './MainNavBar.scss'

const MainNavBar = (props) => {
  return (
    <div className="navBarContainer">
        <img src={logo} alt="Logo"/>
        <h1 className="calendrTitle">CALENDR</h1>
      <div className="nav-buttons">
        <NavLink activeClassName="navbuttonLink" className="navbutton" to="/home">Home</NavLink>
        <NavLink activeClassName="navbuttonLink" className="navbutton" to="/users">Users</NavLink>
        <div className="logout" onClick = {props.logOff}> Logout </div>
      </div>
    </div>
  );
};

export default MainNavBar;
