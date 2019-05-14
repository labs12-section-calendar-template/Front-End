import React, { Component } from "react";
import moment from "moment";
import DayNames from "./DayNames";
import Week from "./Week";
import "./GeneralCalendar.css";
import axios from "axios";
import MainSideBar from '../homePage/MainSideBar'

export class MainCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
      events: [],
      template_id: [],
      templates: [],
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
        let templates = res.data.map(template => {
          return template
        })
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
        this.getEvents(value);
      })
      .catch(err => {
        console.log(err, 'error inside of get templates function');
      });
  };

  getEvents = value => {
    axios
      .get(`${process.env.REACT_APP_API}/templates/${value}/events`)
      .then(res => {
        let events = res.data.map(event => {
          return event;
        });

        this.setState({
          latestEvent: events[events.length - 1],
          events: events
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  selectEvents = (something) => {
    axios
    .get(`${process.env.REACT_APP_API}/templates/${something}/events`)
    .then(res => {
      let events = res.data.map(event => {
        return event;
      });

      this.setState({
        events: events
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  
  singleCheck = event => {

    let temps = this.state.templates
    temps.forEach(temp => {

      if(temp.id == event.target.value && temp.isChecked === 0){
        console.log('yola')
        temp.isChecked = 1;
        //populate the calendar with the events of temp.id
        this.selectEvents(temp.id)
        
      } else if(temp.id == event.target.value && temp.isChecked === 1){
        temp.isChecked = 0
        this.setState({
          events: []
        })
      } else {
        console.log('yolo')
      } 
    })  
    
    this.setState({
      templates: temps
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
    return (
    <div>
        <MainSideBar singleCheck = {this.singleCheck} templates = {this.state.templates}/>
      <div className="wholeCalendar">
        <p>Click a date to add an event.</p>
        <div className="arrow fa fa-angle-left" onClick={this.previous}/>
        <div>{this.renderMonthLabel()}</div>
        <div className="arrow fa fa-angle-right" onClick={this.next} />
        <DayNames />
        <div>{this.renderWeeks()}</div>
      </div>
    </div>
    );
  }
}

export default MainCalendar;
