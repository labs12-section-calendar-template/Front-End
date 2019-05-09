import React, { Component } from 'react'
import axios from 'axios';
import Popup from 'reactjs-popup';
import GroupEdit from './group/GroupEdit'

export class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      joinCode: [],
      group_id:[],
      modalOpen: false
    }
  }

  componentDidMount(){
    this.getGroup();
    // if(this.state.groupName.length < 0){
    //   window.location = '/'
    // }else{
    //   window.location = '/home'
    // }
  }
  
  getGroup = () => {
    let userId = localStorage.getItem('userId')
    axios.get(`http://localhost:3300/users/${userId}/groups`)
    .then(res => {
      this.setState({
        group_id:res.data[0].id,
        groupName: res.data[0].name,
        joinCode: res.data[0].joinCode,
      })
      console.log(this.state.group_id)
      window.localStorage.setItem("group_id", this.state.group_id)
    })
    .catch(err => {
      console.log(err)
    })
  }

  toggleModal = () => {
    if(this.state.modalOpen === false){
      this.setState({
        modalOpen: true,
      })
    }else{
      this.setState({
        modalOpen:false
      })
    }
  }

  render() {
    // console.log(localStorage)
    return (
      <>
        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{this.state.groupName}</h2>
          <i className="far fa-edit" onClick={this.toggleModal}/>
        </div>
          <h5 className='buttonTitles'>Group Members</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDescriptions'>Invite to groups<br/>Join Code {this.state.joinCode}</p>
        </div>
            <h5 className='buttonTitles'>Templates</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle"></i>
          <p className='buttonDescriptions'>Add Template</p>
        </div>
      </div>
      <Popup open={this.state.modalOpen} id="groupEditPopup">
        <GroupEdit toggleModal={this.toggleModal} group_id={this.state.group_id}/>
      </Popup>
      </>
    )
  }
}

export default SideBar