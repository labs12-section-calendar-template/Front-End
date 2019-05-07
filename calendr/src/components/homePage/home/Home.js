import React, { Component } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import SideBar from '../SideBar'
import MainNavBar from '../../general/MainNavBar'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div>
        <MainNavBar logOff = {this.props.logOff}/>
        <SideBar/>
        <Link className="buttonLink" to="/template">
        <button className="firstTemplateButton">Create your first template</button>
        </Link>
      </div>
    )
  }
}

export default Home