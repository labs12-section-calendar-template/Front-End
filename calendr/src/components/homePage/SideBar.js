import React, { Component } from 'react'
import axios from 'axios';
import './Sidebar.scss';

export class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
    }
  }

  componentDidMount(){
    this.getGroupName();
  }
  getGroupName = () => {
    let userId = localStorage.getItem('userId')
    axios.get(`http://localhost:3300/groups/${userId}`)
    .then(res => {
      this.setState({
        groupName: res.data.name,
      })
      console.log(this.state.groups)
    })
    .catch(err => {

    })
  }

  render() {
    console.log(localStorage)
    return (
        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{this.state.groupName}</h2>
        </div>
          <h5 className='buttonTitles'>Group Members</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDescriptions'>Invite to groups</p>
        </div>
            <h5 className='buttonTitles'>Templates</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDescriptions'>Add Template</p>
        </div>
      </div>
    )
  }
}

export default SideBar
