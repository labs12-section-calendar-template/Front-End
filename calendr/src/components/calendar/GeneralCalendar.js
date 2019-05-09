import React, { Component } from 'react'
import moment from 'moment'
import DayNames from "./DayNames"
import Week from './Week'
import './GeneralCalendar.css'


export class GeneralCalendar extends Component {
    state ={
        month: moment()
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
          weeks.push(<Week key={date} date={date.clone()} month={month} />);
    
          date.add(1, "week");
    
          done = count++ > 2 && monthIndex !== date.month();
          monthIndex = date.month();
        }
        return weeks;
      }

      delayRedirect = event => {
  const { history: { push } } = this.props;
  push('/home');
}


  render() {
    return (
      <div className="wholeCalendar">
      <h1>CREATE YOUR EVENTS HERE!</h1>
      <p>Click a date to add an event.</p>
        <DayNames />
        <div>{this.renderWeeks()}</div>
        <button onClick={this.delayRedirect}>SUBMIT</button>
      </div>
    )
  }
}

export default GeneralCalendar
