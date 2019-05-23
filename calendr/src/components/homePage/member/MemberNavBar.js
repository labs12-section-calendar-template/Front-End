import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../extras/CalendrWhite.png";
import '../../../App.scss'

class MemberNavBar extends React.Component {
 

  render(){
    console.log(this.props.usersGroups)
  return (
    <div className="navBarContainer">
    <div className="margin">
        <img src={logo} alt="Logo" style={{cursor: 'pointer'}} onClick={() => {
          window.location=`/memberhome`
        }}/>
        <div className="calendrTitleContainer">
        <h1 className="calendrTitle">CALENDR</h1>
        </div>
      <div className="nav-buttons">
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={this.props.usersGroups.length > 0 ? `/memberhome` : '/' }>Home</NavLink>
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={`/`}>Create/Join</NavLink>
        <div className="logout" onClick = {this.props.logOff}> Logout </div>
      </div>
    </div>
    </div>
  );
  }
};

export default MemberNavBar;
