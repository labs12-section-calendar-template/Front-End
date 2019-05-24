import React, { Component } from "react";
import moment from "moment";
import DayNames from "./DayNames";
import Week from "./Week";
import "../../App.scss";
import axios from "axios";
import MainSideBar from '../homePage/MainSideBar'
import MainNavBar from '../general/MainNavBar'
import { withRouter } from 'react-router-dom'
import { toast } from "react-toastify";
import axiosCustom from '../../axiosCustom'

export class MainCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
      events: [],
      template_id: [],
      templates: [],
      sortedStartTimes: [],
      colors:['purple', 'teal', 'dodgerblue', 'black', 'red', 'green'],
      deleteAll: false,
      // all of this state below needs to be passed down to events.js and further
      startTime: 0,
      endTime: 0,
      startDate: '',
      endDate: '',
      sum: '',
      repeat: 1
    };
  }

  componentDidMount() {
    this.getTemplateData();
    this.getTemplateById();
  }

  // Get template by its corresponding group id
  getTemplateData = event => {
    let group_id = localStorage.getItem("group_id");
    let templateId = localStorage.getItem("template_id");
    axios.get(`${process.env.REACT_APP_API}/groups/${group_id}/templates`, { headers:{Authorization: localStorage.getItem('jwt')}} )
      .then(res => {
        //returns all templates
        let templates = res.data
        if(templates.length > 0 ){

        
       // templates[0].isChecked = 1
       // templates.forEach(temp => {
       //   templates[0].isChecked = 0
        //   temp.isChecked = 1
        // })
        }
        console.log(templates)
        //returns the id of the very last template in the array
        // let value = res.data[res.data.length - 1].id;
        //returns an array of all template IDS
        let tempIds = res.data.map(data => {
          return data.id;
        });

        this.setState({
          template_id: tempIds[tempIds.length - 1],
          templates: templates
        }, () => { if(this.state.templates.length > 0 ){
           this.selectEvents(templateId)
            templates.forEach(temp => {
              if(temp.id == templateId) {
                temp.isChecked = 1
              }
        })
       }});

        // this.getEvents(value);
        // this.getEvents(value).then(res => {
        //   this.setState({
        //     events: res
        //   })
        // }).catch(err => {
        //   console.error(err)
        // })
      })
      .catch(err => {
        console.error(err, 'error inside of get templates function');
      });
  };


    // Delete events 
  deleteEvent = (e, id) => {
    // e.preventDefault();
    let groupID = localStorage.getItem('group_id')
    axiosCustom
      .delete(`${process.env.REACT_APP_API}/events/${id}`)
      .then(res => {
        console.log("event deleted");
       let filteredStuffMikesIdea = this.state.events.filter(event => {
       return event.id !== id
       })
       
       this.setState({
        events: filteredStuffMikesIdea
       })
       toast.success('Event Deleted!')
        })
      .catch(err => {
        console.log(err);
      });
  };

  getEvents = value => {
    return new Promise ((resolve, reject) => { 
      axios.get(`${process.env.REACT_APP_API}/templates/${value}/events`, { headers:{Authorization: localStorage.getItem('jwt')}})
      .then(res => {
        let events = res.data

        let sortedTime = events.sort((a, b) => {
          if(a.startTime > b.startTime){
            return 1
          } else if (a.startTime < b.startTime){
            return -1
          } else {
            return 0
          }
        })

        this.setState({
          events: sortedTime
        })
       
        resolve(events);
      })
      .catch(err => {
        reject(err)
      });
  })};

  // Gets all events for the template id. To be run when a toggle is clicked
  selectEvents = (id) => {
    return new Promise((resolve, reject) => { 
    axios.get(`${process.env.REACT_APP_API}/templates/${id}/events`, { headers:{Authorization: localStorage.getItem('jwt')}})
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


  // Takes in the selectEvents and confirms if a template isChecked or not
  singleCheck = event => {
    let eventsArray = [];
    let temps = this.state.templates

    temps.forEach((temp, i) => {
     if(temp.id == event.target.value && temp.isChecked == false){
        console.log('yola')
        temp.isChecked = 1;
        console.log(temp.isChecked, 'temp')
        this.selectEvents(temp.id).then(res => {
          console.log(res, "res")
          eventsArray.push(...res)
       
        }).catch(err => {
          console.error(err)
        })
        
      } else if(temp.id == event.target.value && temp.isChecked == true){
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

   // StartTime handle change setting startTime to state
  handleStartTimeChange = (time) => {
    this.setState({ startTime: time })
  }
  
  // EndTime handle change setting endTime to state 
  handleEndTimeChange = (time) => {
    this.setState({ endTime: time })
  }

  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value
    });

  };

  // gets the events created to cover multiple weeks 
  getTemplateById = () => {
    let id = localStorage.getItem('template_id')
    axios.get(`${process.env.REACT_APP_API}/templates/${id}`, { headers:{Authorization: localStorage.getItem('jwt')}})
      .then(res => {
        let urlPath = window.location.pathname.split('/')[3]
        console.log(moment.duration(moment(res.data.endDate).diff(moment(urlPath))).asWeeks())
        console.log(res.data.endDate)
        console.log(urlPath)
        this.setState({
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          sum: moment.duration(moment(res.data.endDate).diff(moment(urlPath))).asWeeks()

        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  setStateToEmpty = () => {
    this.setState({
      repeat: 1
    })
  }

  
  // Renders all weeks that populate the calendr
  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = moment(this.state.month)
      .clone()
      .startOf("month")
      .day("Sunday")
    let count = 0;
    let monthIndex = date.month();

    const { month } = this.state;

    // Pulls in weeks and loops over until calendar is complete 
    while (!done) {
      weeks.push(
        <Week
          colors={this.state.colors}
          events={this.state.events}
          templates = {this.state.templates}
          template_id={this.state.template_id}
          key={date}
          date={date.clone()}
          month={month}
          deleteEvent={this.deleteEvent}
          getEvents={this.getEvents}
          check = {this.state.check} 
          startTime = {this.state.startTime} 
          endTime = {this.state.endTime} 
          startDate = {this.state.startDate} 
          endDate = {this.state.endDate} 
          sum = {this.state.sum}
          repeat = {this.state.repeat}

          handleChange = {this.handleChange} 
          handleStartTimeChange = {this.handleStartTimeChange} 
          handleEndTimeChange = {this.handleEndTimeChange}
          setStateToEmpty = {this.setStateToEmpty}
        />
      );

      date.add(1, "week");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }

  // Previous month button function
  previous = () => {
    let { month } = this.state;
    this.setState({
      month: month.subtract(1, "month")
    });
  };
  
  // Next month button function
  next = () => {
    let { month } = this.state;
    this.setState({
      month: month.add(1, "month")
    });
  };

  renderMonthLabel() {
    const month = moment(this.state.month)
    return (
      <span className="month-label">
        {month.startOf("month").format("MMMM YYYY")}
      </span>
    );
  }

  render() {
    // console.log(this.state.events)
    // console.log(this.state.sortedStartTimes)
    return (
    <div>
      <MainNavBar logOff={this.props.logOff}/>
        <MainSideBar singleCheck = {this.singleCheck} templates = {this.state.templates} colors={this.state.colors} />
      <div className="wholeCalendar">
      <div className='wholeCal'>
        <div className="padding"></div>
        <p>Click a date to add an event.</p>
      <div className="arrowsAndMonth">
        <div className="arrow fa fa-angle-left leftArrow" onClick={this.previous}/>
        <div>{this.renderMonthLabel()}</div>
        <div className="arrow fa fa-angle-right rightArrow" onClick={this.next} />
        </div>
        <DayNames />
        <div>{this.renderWeeks()}</div>
        </div>
      </div>
    </div>
    );
  }
}

export default withRouter(MainCalendar);



