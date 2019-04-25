import React, { Component } from 'react'
import { format, addMonths, subMonths } from 'date-fns'

export class month extends Component {
    state = {
        month: format(new Date(), "MM/DD/YYYY")
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
    

  render() {
    let { month } = this.state
    return (
        // Uncomment buttons and console.logs to try the month increment and decrement 
      <div>
        <button onClick={this.previous}> previous </button>
        <button onClick={this.next}> next </button>
        <h2>{month}</h2>

      </div>
    )
  }
}



export default month