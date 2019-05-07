import React from "react";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../../extras/CalendrWhite.png";
import './NavBar.scss'

const MainNavBar = () => {
  return (
    <div className="navBarContainer">
    <div className="margin">
        <img src={logo} alt="Logo"/>
        <h1 className="calendrTitle">CALENDR</h1>
      <div className="nav-buttons">
        <NavLink activeClassName="navbuttonLink" className="navbutton" to="/home">Home</NavLink>
        <NavLink activeClassName="navbuttonLink" className="navbutton" to="/users">Users</NavLink>
      </div>
    </div>
    </div>
  );
};

export default MainNavBar;
