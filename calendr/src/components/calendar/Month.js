import React, { Component } from 'react'
// import {format, compareAsc} from 'date-fns/esm'
import startOfMonth from 'date-fns/start_of_month'
import endOfMonth from 'date-fns/end_of_month'
import addMonth from 'date-fns/add_months'
import subMonth from 'date-fns/sub_months'
import addWeek from 'date-fns/add_weeks'

export class month extends Component {
    state = {
        month: new Date()
    }

    // componentDidMount() {
        
    // }

    // OnClick this function moves to the previous month
previous = () => {
        const { month } = this.state;
        // console.log(month)
        this.setState({
          month: subMonth(month, 1)
        });
      };
        
    // OnClick this function moves to the next month
next = () => {
        const { month } = this.state;
        // console.log(month)
        this.setState({
          month: addMonth(month, 1)
        });
      };
    

  render() {
    let { month } = this.state
    
    return (
      <div>
        {/* Uncomment buttons and console.logs to try the month increment and decrement 
        <button onClick={this.next}> next </button>
        <button onClick={this.previous}> previous </button> */}


      </div>
    )
  }
}



export default month
