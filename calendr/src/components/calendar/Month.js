import React, { Component } from 'react'
import moment from "moment";
import GeneralCalendar from './GeneralCalendar';

export class Month extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
    };
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

  // renderWeeks() {
  //   let weeks = [];
  //   let done = false;
  //   let date = this.state.month
  //     .clone()
  //     .startOf("month")
  //     .day("Sunday");
  //   let count = 0;
  //   let monthIndex = date.month();

  //   const { month } = this.state;

  //   while (!done) {
  //     weeks.push(<Week key={date} date={date.clone()} month={month} />);

  //     date.add(1, "week");

  //     done = count++ > 2 && monthIndex !== date.month();
  //     monthIndex = date.month();
  //   }
  //   return weeks;
  // }

  MonthDays = () => {
    this.state.month.map(mon => mon.startOf("month"));
  };

  renderMonthLabel() {
    const { month } = this.state;
    return (
      <span>
        {month.startOf("month").format("MMMM YYYY")}
      </span>
    );
  }

  render() {
    return (
      <div>
        <header>
          <div>
            <i
              className="arrow fa fa-angle-left"
              onClick={this.previous}
            />
            <h1>{this.renderMonthLabel()}</h1>
            <i className="arrow fa fa-angle-right" onClick={this.next} />
          </div>
        </header>
        <GeneralCalendar/>
      </div>
    );
  }
}

export default Month;