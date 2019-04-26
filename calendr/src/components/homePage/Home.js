import React, { Component } from 'react'
import "./Home.css"

export class Home extends Component {
  render() {
    return (
      <div className="homePageStyles">
          <h2>Group Name</h2>
          <h4 className='allTemps'>All Templates</h4>
          <h5>Group Members</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p>Invite to groups</p>
        </div>
            <h5>Templates</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p>Add Template</p>
        </div>

      </div>
    )
  }
}

export default Home