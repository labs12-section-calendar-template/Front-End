import React, { Component } from 'react'
import axios from 'axios';
// import Popup from 'reactjs-popup';

export class MemberSideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      joinCode: [],
      group_id:[],
      tamplates: [],
      modalOpen: false
    }
  }

  componentDidMount(){
    this.getGroup();
  }
  
  getGroup = () => {
    let memberId = localStorage.getItem('memberId')
    axios.get(`http://localhost:3300/members/${memberId}/groups`)
    .then(res => {
        console.log(res.data)
        let groupID = res.data[0].id
      this.setState({
        group_id: res.data[0].id,
        groupName: res.data[0].name,
        joinCode: res.data[0].joinCode,
      })
      
      this.getGroupTemplates(groupID)

      console.log(this.state.group_id)
      window.localStorage.setItem("group_id", this.state.group_id)
    })
    .catch(err => {
      console.log(err)
    })
  }

  getGroupTemplates = (groupID) => {
    axios.get(`http://localhost:3300/members/${groupID}/groups`)
    .then(res => {
        console.log(res.data)
        this.setState({
            templates: res.data
        })
    }).catch(err => {
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
        <div className="memberHomeWrapper">

        <div className="groupNameTemplate">
        </div>
          <h5 className='buttonTitles'>Group Name</h5>
            <div className='buttonBox'>
                <h3 className = "groupName">{this.state.groupName}</h3>
            </div>
          <h5 className='buttonTitles'>Group Members</h5>

        <div className='buttonBox'>
          <ul>
              <li>member 1</li>
          </ul>
        </div>

            <h5 className='buttonTitles'>Templates</h5>

        <div className='buttonBox'>
            <ul>
              <li>template 1</li>
          </ul>
        </div>

      </div>
      {/* <Popup open={this.state.modalOpen} id="groupEditPopup">
        <div toggleModal={this.toggleModal} group_id={this.state.group_id}/>
      </Popup> */}
      </>
    )
  }
}

export default MemberSideBar