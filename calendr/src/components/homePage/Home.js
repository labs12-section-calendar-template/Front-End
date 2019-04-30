import React, { Component } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import SideBar from './SideBar'

export class Home extends Component {
  render() {
    return (
      <div>
        <SideBar/>

        <Link className="buttonLink" to="/template">
        <button className="firstTemplateButton">Create your first template</button>
        </Link>
      </div>
    )
  }
}

export default Home