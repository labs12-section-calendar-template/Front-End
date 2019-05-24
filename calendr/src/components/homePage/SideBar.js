import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import GroupEdit from './group/GroupEdit'
import { withRouter } from 'react-router-dom';
import '../../App.scss'
import axiosCustom from '.././../axiosCustom'
import ReactTooltip from 'react-tooltip';



///////////////////   URL => HOME      ///////////////////////
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

  componentDidMount = () => {
    this.getGroup();
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.match.url !== this.props.match.url) {
      this.getGroup()
    }
  }

  
  getGroup = () => {
    let userId = localStorage.getItem('userId')
    let groupId = localStorage.getItem("group_id")
    axiosCustom.get(`/users/${userId}/groups`, { headers:{Authorization: localStorage.getItem('jwt')}},)
    .then(res => {
      this.setState({
        group_id: groupId,
        groups: res.data
      })
      this.getGroupById(groupId)
      console.log(groupId)
      console.log(res.data)
    
    })
    .catch(err => {
      console.log(err)
    })
  }

  getGroupById = (something) => {

    axiosCustom.get(`/groups/${something}`, {headers: { Authorization: localStorage.getItem('jwt')}})
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

  groupPage = () =>{
    window.location='/'
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

  showGroupName = (event) => {
    let groups = this.state.groups
    groups.forEach(group => {
    if(event.target.attributes.value.value == group.id) {
      window.localStorage.setItem("group_id", event.target.attributes.value.value)
    this.props.history.push(`/home/${group.id}`)
 
    } 
  })
   
  }

  render() {
    return (
      <>
      
      <ReactTooltip />
      <div className="desktopNav"> 
        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{this.state.groupName}</h2>
          <i className="far fa-edit" data-tip='Update or Delete your group' onClick={this.toggleModal}/>
        </div>
          <p className='buttonDescriptions'>Join Code: {this.state.joinCode}</p>
        <div>
        <h5 className='buttonTitles'>Groups</h5>
       {this.state.groups.map(group => (
      <div key={group.id} value={group.id} className="groupName" onClick={this.showGroupName} >
        {group.name}
      </div>
        ))}
        </div>
            <h5 className='buttonTitles'>Templates</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" onClick={this.circleAddTemplate}/>
          <p className='buttonDescriptions'>Add Template</p>
        </div>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" onClick={this.groupPage}/>
          <p className='buttonDescriptions'>Create/Join Group</p>
        </div>
      </div>
      </div>
      <Popup open={this.state.modalOpen} id="groupEditPopup">
        <GroupEdit groups={this.state.groups} toggleModal={this.toggleModal} group_id={this.state.group_id}/>
      </Popup>
      </>
    )
  }
}

export default withRouter(SideBar)