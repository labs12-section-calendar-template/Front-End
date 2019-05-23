import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../extras/CalendrWhite.png";
import '../../App.scss'
import axios from 'axios';

class MainNavBar extends React.Component {
  constructor(props) {
    super(props)
  }
    state = {
        groups: []
}

  componentDidMount() {
    this.getGroup()
  }

  getGroup = () => {
    let userId = localStorage.getItem('userId')
    axios.get(`${process.env.REACT_APP_API}/users/${userId}/groups`)
    .then(res => {
      this.setState({
        groups:res.data,
      })
    })
    .catch(err => {
      console.error(err)
    })
  }


  render(){
  let takeMeHome = localStorage.getItem('group_id')
  return (
    <div className="navBarContainer">
    <div className="margin">
        <img src={logo} alt="Logo" style={{cursor: 'pointer'}} onClick={() => {
          window.location=`/home/${takeMeHome}`
        }}/>
        <div className="calendrTitleContainer">
        <h1 className="calendrTitle">CALENDR</h1>
        </div>
      <div className="nav-buttons">
        {this.state.groups.length > 0 && 
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={`/home/${takeMeHome}`}>Home</NavLink> }
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={`/billing`}>Billing</NavLink>
        <div className="logout" onClick = {this.props.logOff}> Logout </div>
      </div>
    </div>
    </div>
  );
  }
};

export default MainNavBar;
