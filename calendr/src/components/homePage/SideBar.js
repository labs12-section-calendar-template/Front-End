import React, { Component } from 'react'
import axios from 'axios';

export class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      group_id: []
    }
  }

  componentDidMount(){
    this.getGroupName();
  }
  
  getGroupName = () => {
    let userId = localStorage.getItem('userId')
    axios.get(`http://localhost:3300/users/${userId}/groups`)
    .then(res => {
      this.setState({
        groupName: res.data[0].name,
        group_id: res.data[0].id
      })
      console.log(this.state.group_id)
      window.localStorage.setItem("group_id", this.state.group_id)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    // console.log(localStorage)
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
