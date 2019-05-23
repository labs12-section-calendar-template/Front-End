import React, { Component } from 'react'
import moment from 'moment'
import DayNames from "../../calendar/DayNames"
import MemberWeek from './MemberWeek'
import MemberSideBar from './MemberSideBar'
import "../../../App.scss"


export class MemberCalendar extends Component {
  state = {
    month: moment()
  }
  
  // Previous month button function
  previous = () => {
    const { month } = this.state;

    this.setState({
      month: month.subtract(1, "month")
    });
  };

    // Next month button function
  next = () => {
    const { month } = this.state;

    this.setState({
      month: month.add(1, "month")
    });
  };

  // Month label above calendr
  renderMonthLabel() {
    const { month } = this.state;
    return (
      <span className="month-label">
        {month.startOf("month").format("MMMM YYYY")}
      </span>
    );
  }

  // Renders all weeks that populate the calendr
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
  // Pulls in weeks and loops over until calendar is complete 
    while (!done) {
      weeks.push(<MemberWeek 
                  key={date} 
                  date={date.clone()} 
                  month={month}
                  events = {this.props.events}
                  templates = {this.props.events}
                  />);

      date.add(1, "week");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }


  render() {
    return (
      <>
      <div className = "wrapper">
        
      <MemberSideBar singleCheck = {this.props.singleCheck} group = {this.props.group} templates = {this.props.templates} />
      
      <div className="wholeCalendar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="arrowsAndMonth-members">
          <div className="arrow fa fa-angle-left" onClick={this.previous} />
          <div>{this.renderMonthLabel()}</div>
          <div className="arrow fa fa-angle-right" onClick={this.next} />
        </div>
        <DayNames />
        <div>{this.renderWeeks()}</div>
      </div>

      </div>
      </>
    )
  }
}

export default MemberCalendar;
