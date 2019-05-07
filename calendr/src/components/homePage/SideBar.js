import React, { Component } from 'react'

export class SideBar extends Component {
  render() {
    console.log(localStorage.getItem('groupName'));
    return (
        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{}</h2>
        </div>
          <h5 className='buttonTitles'>Group Members</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDiscriptions'>Invite to groups</p>
        </div>
            <h5 className='buttonTitles'>Templates</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDiscriptions'>Add Template</p>
        </div>
      </div>
    )
  }
}

export default SideBar
