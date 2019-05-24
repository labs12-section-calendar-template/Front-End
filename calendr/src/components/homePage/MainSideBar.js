import React, { Component } from 'react'
import axiosCustom from '.././../axiosCustom';
import axios from 'axios';
import Popup from 'reactjs-popup';
import GroupEdit from './group/GroupEdit'
import { withRouter, NavLink } from 'react-router-dom';


export class MainSideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      joinCode: [],
      group_id:[],
      modalOpen: false,
      templates:[],
      navBar: false,
      groups: []
    }
  }

  // mounting getGroup
  componentDidMount(){
    this.getGroup();
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.match.url !== this.props.match.url) {
      this.getGroup()
    }
  }

  componentWillUnmount(){
    this.getGroup();
  }
  
  getGroup = () => {
    let userId = localStorage.getItem('userId')
    let groupId = localStorage.getItem("group_id")
    axios.get(`${process.env.REACT_APP_API}/users/${userId}/groups`, { headers:{ Authorization: localStorage.getItem('jwt') }})
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
    
    axios.get(`${process.env.REACT_APP_API}/groups/${something}`, { headers:{Authorization: localStorage.getItem('jwt')}})
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

  // sideBar nav toggle on and off 
  navAppear = (event) => {
    event.preventDefault();
    if(!this.state.navBar){
        console.log('yo')
        this.setState({
            navBar: true
        })
    } else {
        console.log('yoyo')
        this.setState({
            navBar: false
        })
    }
}
  
  // get group information for display purposes 
  // getGroup = () => {
  //   let userId = localStorage.getItem('userId')
  //   axiosCustom.get(`${process.env.REACT_APP_API}/users/${userId}/groups`)
  //   .then(res => {
  //     this.setState({
  //       group_id:res.data[0].id,
  //       groupName: res.data[0].name,
  //       joinCode: res.data[0].joinCode,
  //     })

      
  //     window.localStorage.setItem("group_id", this.state.group_id)
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  // }

  // onClick funtion to redirect to add template
  circleAddTemplate = () => {
    window.location = '/template'
  }

  // group edit popup 
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

  // probably not needed
  onChangeHandler = (e) => {
    this.setState({
      [e.target.value]: e.target.name
    })
  }

  // sets template id in localStorage based on the one clicked
  switchTemplate = (templateId) => {
    localStorage.setItem('template_id', templateId)
    this.props.history.push(`/template/calendr/${templateId}`)
  }

  render() {
    return (
      <>
       <ReactTooltip  data-effect='solid' data-className='tooltip' data-multiline='true' html={true} />

      <div className = "header">
        <div id="navIcon"><i onClick = {this.navAppear} className = "fa fa-bars" aria-hidden="true"/><p>Menu</p></div>
            <div className = {this.state.navBar ? "navDiv":"navOpen"}>
                
        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{this.state.groupName}</h2>
          {/* <i className="far fa-edit" onClick={this.toggleModal}/> */}
        </div>
          
          
        
        <p>Join Code: {this.state.joinCode}</p>
        
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" onClick={this.circleAddTemplate}/>
          <p className='buttonDescriptions'>Add Template</p>
        </div>
           <h5 className='buttonTitles'>Templates</h5>
            <div>
                {this.props.templates.map(template => {
                  return <div key={template.id} value = {template.id} className="template-list-items">
                  <input
                  className="each-template-input"
                  type="checkbox"
                  name={template.id}
                  checked={template.isChecked > 0 } 
                  check={template.isChecked}
                  value={template.id}
                  onClick={this.props.singleCheck}
                  onChange = {this.onChangeHandler}
                  />    
                  <NavLink activeClassName="chosen" className="each-template-name" 
                  
                  to={`/template/calendr/${template.id}`}

                  style={{color:this.props.colors[template.id % 6]}}  
                  onClick={() => {this.switchTemplate(template.id)}}
                  >{template.title}</NavLink>
          
                </div>
                })} 
            </div>
      </div>
      <Popup open={this.state.modalOpen} id="groupEditPopup">
        <GroupEdit toggleModal={this.toggleModal} group_id={this.state.group_id}/>
      </Popup>
                </div>
          </div>  
      </>
    )
  }
}

export default withRouter(MainSideBar)