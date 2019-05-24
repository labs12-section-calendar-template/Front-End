import React from 'react';
import axios from 'axios';
import MemberSideBar from './MemberSideBar';
import MemberCalendar from './MemberCalendar'
import '../../../App.scss'
import { NavLink } from "react-router-dom";
// import logo from "../../../extras/CalendrWhite.png";
import { toast } from 'react-toastify';
import axiosCustom from '../../../axiosCustom';
import MemberNavBar from './MemberNavBar';

class MemberHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            joinCode: [],
            templates: [],
            events: [],
            usersGroups: [],
            colors:['purple', 'teal', 'dodgerblue', 'black', 'red', 'green']
        }
    }

    // Mounts getGroup and checkUsersGroups
    componentDidMount(){
        this.getGroup()
        this.getUsersGroup()
    }


    getUsersGroup = () => {
      let userId = localStorage.getItem('userId')
      axios.get(`${process.env.REACT_APP_API}/users/${userId}/groups`)
      .then(res => {
        this.setState({
          usersGroups:res.data,
        })
      })
      .catch(err => {
        console.error(err)
      })
    }

    // Allows a member to join a group
    getGroup = () => {
    let joinCode = localStorage.getItem('joinCode')

    axiosCustom.post(`${process.env.REACT_APP_API}/groups/getwith/joincode`, { joinCode } )
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

    // Gets all the templates for the group joined
    getGroupTemplates = (groupID) => {
        axiosCustom.get(`${process.env.REACT_APP_API}/groups/${groupID}/templates`)
          .then(res => {
            this.setState({
              templates: res.data
            })
          }).catch(err => {
            console.log(err)
          })
      }

      selectEvents = (something) => {
        return new Promise((resolve, reject) => { axiosCustom
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
    // Takes in the selectEvents and confirms if a template isChecked or not
      singleCheck = event => {
        let eventsArray = [];
        let temps = this.state.templates
        console.log(event.target.value)
        console.log(event.target.attributes)
        console.log(event.target.attributes.value.value)
    
        temps.forEach((temp, i) => {
          console.log(temp.isChecked)
          if(temp.id == event.target.attributes.value.value && temp.isChecked == false){
            console.log('yola')
            temp.isChecked = 1;
            this.selectEvents(temp.id).then(res => {
              console.log(res, "res")
              eventsArray.push(...res)
           
            }).catch(err => {
              console.error(err)
            })
            
          } else if(temp.id == event.target.attributes.value.value && temp.isChecked == true){
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
     <MemberNavBar usersGroups = {this.state.usersGroups}/>

    <h1>View Your Group's Events Here</h1>
    <MemberCalendar
     events = {this.state.events}
     templates = {this.state.templates}
     singleCheck = {this.singleCheck} 
     group = {this.state.group}
     colors={this.state.colors}
     />
    </div> 

    );
    }

}
 
export default MemberHome;