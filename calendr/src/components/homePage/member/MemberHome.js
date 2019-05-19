import React from 'react';
import axios from 'axios';
import MemberSideBar from './MemberSideBar';
import MemberCalendar from './MemberCalendar'
import './memberHome.scss'
import { NavLink } from "react-router-dom";
import logo from "../../../extras/CalendrWhite.png";
import { toast } from 'react-toastify';
// import './NavBar.scss'

class MemberHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            joinCode: [],
            templates: [],
            events: [],
            usersGroups: []
        }
    }

    componentDidMount(){
        this.getGroup()
    }

    getGroup = () => {
    let joinCode = localStorage.getItem('joinCode')

    axios.post(`${process.env.REACT_APP_API}/groups/getwith/joincode`, { joinCode } )
    .then(res => {
        let groupID = res.data.id
      this.setState({
        group: res.data,
        joinCode: res.data.joinCode,
      })
      
      this.getGroupTemplates(groupID)
      

      window.localStorage.setItem("group_id", res.data.id)
    })
    .catch(err => {
      console.log(err)
    })
    }

    getGroupTemplates = (groupID) => {
        axios.get(`${process.env.REACT_APP_API}/groups/${groupID}/templates`)
          .then(res => {
            this.setState({
              templates: res.data
            })
          }).catch(err => {
            console.log(err)
          })
      }

      selectEvents = (something) => {
        return new Promise((resolve, reject) => { axios
        .get(`${process.env.REACT_APP_API}/templates/${something}/events`)
        .then(res => {
          console.log(res.data)
         let events = res.data
          this.setState( previousState => {return {
            events: [...previousState.events, ...events].sort((a,b) => {
              if(a.startTime > b.startTime){
                          return 1
                        } else if (a.startTime < b.startTime){
                          return -1
                        } else {
                          return 0
                        }
            })
          }});
        })
        .catch(err => {
          reject(err);
        })});
      }

      singleCheck = event => {
        let eventsArray = [];
        let temps = this.state.templates
        console.log(event.target.value)
        console.log(event.target.atrributes)
        console.log(event.target.attributes.value.value)
    
        temps.forEach((temp, i) => {
          if(temp.id == event.target.attributes.value.value && temp.isChecked === 0){
            console.log('yola')
            temp.isChecked = 1;
            this.selectEvents(temp.id).then(res => {
              console.log(res, "res")
              eventsArray.push(...res)
           
            }).catch(err => {
              console.error(err)
            })
            
          } else if(temp.id == event.target.attributes.value.value && temp.isChecked === 1){
            console.log('yolu')
            temp.isChecked = 0
          } else if (temp.isChecked === 1){
            console.log('yolo')
            this.selectEvents(temp.id).then(res => {
              eventsArray.push(...res)
            }).catch(err => {
              console.error(err)
            })
          } 
          if(i === temps.length-1){
            this.setState (() => {
              return { events: eventsArray }
            })
             
          }
        })
      }


    render() { 
        return ( 
          
            
        <div>
            <div className="navBarContainer">
    <div className="margin">
        <img src={logo} alt="Logo"/>
        <h1 className="calendrTitle">CALENDR</h1>
      <div className="nav-buttons">
      
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={this.state.usersGroups.length > 0 ? `/home/${this.state.usersGroups[0].id}` : '/' }>Home</NavLink>
        <NavLink activeClassName="navbuttonLink" className="navbutton" to={`/`}>Create/Join</NavLink>
        <div className="logout" onClick = {this.props.logOff}> Logout </div>
      </div>
    </div>
    </div>
            <h1>View Your Group's Events Here</h1>
            <MemberSideBar singleCheck = {this.singleCheck} group = {this.state.group} templates = {this.state.templates} />
            <MemberCalendar events = {this.state.events}
                            templates = {this.state.templates}
                            
                            />
        </div> 

        );
    }

}
 
export default MemberHome;