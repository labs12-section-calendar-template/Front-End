import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../extras/CalendrWhite.png";
import '../../App.scss'

const MainNavBar = (props) => {
  let takeMeHome = localStorage.getItem('group_id')
  return (
    <div className="navBarContainer">
    <div className="margin">
        <img src={logo} alt="Logo"/>
        <div className="calendrTitleContainer">
        <h1 className="calendrTitle">CALENDR</h1>
        </div>
      <div className="nav-buttons">
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={`/home/${takeMeHome}`}>Home</NavLink>
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={`/billing`}>Billing</NavLink>
        <div className="logout" onClick = {props.logOff}> Logout </div>
      </div>
    </div>
    </div>
  );
};

export default MainNavBar;
