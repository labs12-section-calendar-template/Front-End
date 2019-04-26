import React, { Component } from 'react'
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  addWeeks, 
  subWeeks, 
  startOfWeek, 
  endOfWeek, 
  isSunday
} from 'date-fns'
import Week from "./Week"

export class month extends Component {
    state = {
        month: format(new Date('2019,04,25'), "MM/DD/YYYY")
    }

    // componentDidMount() {
        
    // } 

    // OnClick this function moves to the previous month
previous = () => {
        const { month } = this.state;
        console.log(month)
        this.setState({
          month: format(subMonths(month, 1), "MM/DD/YYYY")
        });
      };


      // OnClick this function moves to the next month
next = () => {
        const { month } = this.state;
        console.log(month)
        this.setState({
          month: format(addMonths(month, 1), "MM/DD/YYYY")
        });
      };       
    


  renderWeeks() {
    let date = new Date()
    let startDate = startOfMonth(date);

      console.log(startDate)
    
    let weeks = [];
    let done = false;
    let count = 0;
    
    // let monthIndex = date.month();

  //   while (!done) {
  //     weeks.push(<Week key={date} date={date} month={month} />);

  //     addWeeks(date, 1);

  //     // done = count++ > 2 && monthIndex !== date.month();
  //     // monthIndex = date.month();
  //   }
  //   return weeks;
  }
  // MonthDays = () => {
  //   this.state.month.map(mon => mon.startOfMonths("month"));
  // };

  // renderMonthLabel() {
  //   const { month } = this.state;
  //   return (
  //     <span className="month-label">
  //       {month.startOf("month").format("MMMM YYYY")}
  //     </span>
  //   );
  // }

  render() {
    let { month } = this.state
    return (
        // Uncomment buttons and console.logs to try the month increment and decrement 
      <div>
        <button onClick={this.previous}> previous </button>
        <button onClick={this.next}> next </button>
        <h2>{month}</h2>
        <div>{this.renderWeeks()}</div>
      </div>
    )
  }
}



export default month