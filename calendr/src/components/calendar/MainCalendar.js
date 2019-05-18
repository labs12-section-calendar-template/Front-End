import React, { Component } from "react";
import moment from "moment";
import DayNames from "./DayNames";
import Week from "./Week";
import "./GeneralCalendar.scss";
import axios from "axios";
import MainSideBar from '../homePage/MainSideBar'
import MainNavBar from '../general/MainNavBar'

export class MainCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
      events: [],
      template_id: [],
      templates: [],
      sortedStartTimes: []
    };
  }
  
  componentDidMount() {
    this.getTemplateData();
  }

  getTemplateData = event => {
    let group_id = localStorage.getItem("group_id");
    axios
      .get(`${process.env.REACT_APP_API}/groups/${group_id}/templates`)
      .then(res => {
        //returns all templates
        let templates = res.data
        //returns the id of the very last template in the array
        let value = res.data[res.data.length - 1].id;
        //returns an array of all template IDS
        let tempIds = res.data.map(data => {
          return data.id;
        });

        this.setState({
          template_id: tempIds[tempIds.length - 1],
          templates: templates
        });

        // this.getEvents(value);
        this.getEvents(value).then(res => {
          this.setState({
            events: res
          })
        }).catch(err => {
          console.error(err)
        })
      })
      .catch(err => {
        console.error(err, 'error inside of get templates function');
      });
  };

  getEvents = value => {
    return new Promise ((resolve, reject) => { axios
      .get(`${process.env.REACT_APP_API}/templates/${value}/events`)
      .then(res => {
        let events = res.data
        // let eventTimes = res.data.map(event => {
        //   return event.startTime
        // })

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
  

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month
      .clone()
      .startOf("month")
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    const { month } = this.state;

    while (!done) {
      weeks.push(
        <Week
          events={this.state.events}
          templates = {this.state.templates}
          template_id={this.state.template_id}
          key={date}
          date={date.clone()}
          month={month}
        />
      );

      date.add(1, "week");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }

  previous = () => {
    const { month } = this.state;
  
    this.setState({
      month: month.subtract(1, "month")
    });
  };
  
  next = () => {
    const { month } = this.state;
  
    this.setState({
      month: month.add(1, "month")
    });
  };
  renderMonthLabel() {
    const { month } = this.state;
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
      <MainNavBar/>
        <MainSideBar singleCheck = {this.singleCheck} templates = {this.state.templates}/>
      <div className="wholeCalendar">
      <div className='wholeCal'>
        <div className="padding"></div>
        <p>Click a date to add an event.</p>
      <div className="arrowsAndMonth">
        <div className="arrow fa fa-angle-left" onClick={this.previous}/>
        <div>{this.renderMonthLabel()}</div>
        <div className="arrow fa fa-angle-right" onClick={this.next} />
        </div>
        <DayNames />
        <div>{this.renderWeeks()}</div>
        </div>
      </div>
    </div>
    );
  }
}

export default MainCalendar;
