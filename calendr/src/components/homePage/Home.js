import React, { Component } from 'react'
import "./Home.css"

export class Home extends Component {
  render() {
    return (
      <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">*Group Name*</h2>
          <h5 className='allTemps'>All Templates</h5>
        </div>
          <h5 className='buttonTitles'>Group Members</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDisciptions'>Invite to groups</p>
        </div>
            <h5 className='buttonTitles'>Templates</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDisciptions'>Add Template</p>
        </div>

      </div>
    )
  }
}

export default Home