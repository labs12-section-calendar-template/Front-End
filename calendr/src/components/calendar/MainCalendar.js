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
      template_id: []
    };
  }
  componentDidMount() {
    this.getTemplateId();
  }
  getTemplateId = event => {
    let group_id = localStorage.getItem("group_id");
    axios
      .get(`http://localhost:3300/groups/${group_id}/templates`)
      .then(res => {
        let value = res.data[0].id;
        let tempIds = res.data.map(data => {
          return data.id;
        });

        // console.log(group_id);

        this.setState({
          template_id: tempIds[tempIds.length - 1]
        });
        console.log(value);
        this.getEvents(value);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getEvents = value => {
    axios
      .get(`http://localhost:3300/templates/${value}/events`)
      .then(res => {
        let events = res.data.map(event => {
          return event.title;
        });
        // console.log(events);
        this.setState({
          events: events[events.length - 1]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
        <MainSideBar/>
      <div className="wholeCalendar">
        <p>Click a date to add an event.</p>
        <div className="arrow fa fa-angle-left" onClick={this.previous}/>
        <div>{this.renderMonthLabel()}</div>
        <div className="arrow fa fa-angle-right" onClick={this.next} />
        <DayNames />
        <div>{this.renderWeeks()}</div>
        <button onClick={this.delayRedirect}>SUBMIT</button>
      </div>
    </div>
    );
  }
}

export default MainCalendar;