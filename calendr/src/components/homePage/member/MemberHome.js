import React from 'react';
import axios from 'axios';
import MemberSideBar from './MemberSideBar';
import MemberCalendar from './MemberCalendar'
import './memberHome.scss'

class MemberHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            joinCode: [],
            templates: [],
            events: []
        }
    }

    componentDidMount(){
        this.getGroup()
    }

    getGroup = () => {
    let joinCode = localStorage.getItem('joinCode')

    axios.post(`${process.env.REACT_APP_API}/groups/getby/joincode`, {joinCode})
    .then(res => {
        console.log(res.data)
        let groupID = res.data.group.id
      this.setState({
        group: res.data.group,
        joinCode: res.data.group.joinCode,
      })
      
      this.getGroupTemplates(groupID)

      window.localStorage.setItem("group_id", this.state.group_id)
    })
    .catch(err => {
      console.log(err)
    })
    }

    getGroupTemplates = (groupID) => {
        axios.get(`${process.env.REACT_APP_API}/groups/${groupID}/templates`)
          .then(res => {
            console.log(res.data)
            let value = res.data[res.data.length - 1].id;
            this.setState({
              templates: res.data
            })
            this.getEvents(value)
          }).catch(err => {
            console.log(err)
          })
      }

      // getEvents = value => {
      //   return new Promise ((resolve, reject) => { axios
      //     .get(`${process.env.REACT_APP_API}/templates/${value}/events`)
      //     .then(res => {
      //       let events = res.data
      //       // let eventTimes = res.data.map(event => {
      //       //   return event.startTime
      //       // })
    
      //       let sortedTime = events.sort((a, b) => {
      //         if(a.startTime > b.startTime){
      //           return 1
      //         } else if (a.startTime < b.startTime){
      //           return -1
      //         } else {
      //           return 0
      //         }
      //       })
    
      //       this.setState({
      //         events: sortedTime
      //       })
           
      //       resolve(events);
      //     })
      //     .catch(err => {
      //       reject(err)
      //     });
      // })};

      selectEvents = (something) => {
        return new Promise((resolve, reject) => { axios
        .get(`${process.env.REACT_APP_API}/templates/${something}/events`)
        .then(res => {
         let events = res.data
         console.log(res.data)
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
    
        temps.forEach((temp, i) => {
          if(temp.id == event.target.value && temp.isChecked === 0){
            console.log('yola')
            temp.isChecked = 1;
            this.selectEvents(temp.id).then(res => {
              console.log(res, "res")
              eventsArray.push(...res)
           
            }).catch(err => {
              console.error(err)
            })
            
          } else if(temp.id == event.target.value && temp.isChecked === 1){
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
            console.log(eventsArray)
            this.setState (() => {
              return { events: eventsArray }
            })
             
          }
        })
      }
    //Groupname needs to be displayed based off of joincode
    //templates for the group above need to be displayed
    //clicking on the templates that are displayed need to display all of the events

    render() { 
        return ( 
            
        <div>
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