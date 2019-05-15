import React, { Component } from 'react'
import axios from 'axios';
import Popup from 'reactjs-popup';
import GroupEdit from './group/GroupEdit'
import { withRouter } from 'react-router-dom';

export class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      joinCode: [],
      group_id:[],
      modalOpen: false,
      groups: []
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

  componentDidUpdate = (prevProps) => {
    if(prevProps.match.url !== this.props.match.url) {
      this.getGroup()
    }
  }
  
  getGroup = () => {
    let userId = localStorage.getItem('userId')
    let groupId = localStorage.getItem("group_id")
    axios.get(`${process.env.REACT_APP_API}/users/${userId}/groups`)
    .then(res => {
      this.setState({
        group_id: groupId,
        groups: res.data
      })
      this.getGroupById(groupId)
      console.log(groupId)
      console.log(res.data)
     // window.localStorage.setItem("group_id", this.state.group_id)
    })
    .catch(err => {
      console.log(err)
    })
  }

  getGroupById = (something) => {
    
    axios.get(`${process.env.REACT_APP_API}/groups/${something}`)
    .then(res => {
      this.setState({
        groupName: res.data.name,
        joinCode: res.data.joinCode,
      })
  })
  .catch(err => {
    console.log(err)
  })
  }

  circleAddTemplate = () => {
    window.location = '/template'
  }

  removeUsers = () => {
    window.location = '/users'
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

  something = (event) => {
    let groups = this.state.groups
    groups.forEach(group => {
      console.log(event.target.attributes.getNamedItem('value').value)
    if(event.target.attributes.getNamedItem('value').value == group.id) {
      window.localStorage.setItem("group_id", event.target.attributes.getNamedItem('value').value)
    this.props.history.push(`/home/${group.id}`)
 
    } 
  })
   
  }

  render() {
    return (
      <>
        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{this.state.groupName}</h2>
          <i className="far fa-edit" onClick={this.toggleModal}/>
       
          <p className='buttonDescriptions'>Join Code {this.state.joinCode}</p>
        </div>
        <div>
        <h5 className='buttonTitles'>Groups</h5>
       {this.state.groups.map(group => (
      <div key={group.id} value={group.id} className="groupName" onClick={this.something} >
    {group.name}
      </div>
        ))}
        </div>
          
       
       
            <h5 className='buttonTitles'>Templates</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" onClick={this.circleAddTemplate}/>
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

export default withRouter(SideBar)