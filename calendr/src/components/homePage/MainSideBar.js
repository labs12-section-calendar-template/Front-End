import React, { Component } from 'react'
import axios from 'axios';
import Popup from 'reactjs-popup';
import GroupEdit from './group/GroupEdit'


export class MainSideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      joinCode: [],
      group_id:[],
      modalOpen: false,
      templates:[]
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
    axios.get(`${process.env.REACT_APP_API}/users/${userId}/groups`)
    .then(res => {
        let groupId = res.data[0].id
      this.setState({
        group_id:res.data[0].id,
        groupName: res.data[0].name,
        joinCode: res.data[0].joinCode,
      })

      this.getTemplate(groupId)

      console.log(res.data[0].id)
      window.localStorage.setItem("group_id", this.state.group_id)
    })
    .catch(err => {
      console.log(err)
    })
  }

  getTemplate = (groupId) => {
      
    axios
      .get(`${process.env.REACT_APP_API}/groups/${groupId}/templates` )
      .then(res => {
          this.setState({
              templates: res.data
            })
            console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  circleAddTemplate = () => {
    window.location = '/template'
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

  handleClick = (event) => {

   this.setState({
    [event.target.name]: event.target.value
   })
  }

  render() {
    console.log(this.state.templates)
   
    return (
      <>

        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{this.state.groupName}</h2>
          <i className="far fa-edit" onClick={this.toggleModal}/>
        </div>
          <h5 className='buttonTitles'>Group Members</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" />
          <p className='buttonDescriptions'>Invite to groups<br/>Join Code {this.state.joinCode}</p>
        </div>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" onClick={this.circleAddTemplate}/>
          <p className='buttonDescriptions'>Add Template</p>
        </div>
           <h5 className='buttonTitles'>Templates</h5>
            <div>
                {this.state.templates.map(template => {return <div key={template.id}>
    <input
    type="checkbox"
    name={template.id}
    checked={this.state.questionMark}
    onClick={this.handleClick}
    />         
<h5>{template.title}</h5>
                </div>
                })} 
            </div>
      </div>
      <Popup open={this.state.modalOpen} id="groupEditPopup">
        <GroupEdit toggleModal={this.toggleModal} group_id={this.state.group_id}/>
      </Popup>
      </>
    )
  }
}

export default MainSideBar