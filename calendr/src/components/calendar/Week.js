import React from "react";
import Day from "./Day";

class Week extends React.Component {

  render() {
    console.log(this.props.events)
    let days = [];
    let { date } = this.props;

    for (let i = 0; i <= 6; i++) {
      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        date: date
      };
      days.push(day);

      date = date.clone();
      date.add(1, "day");
    }

    return (
      <div className="week">
        {days.map(day => (
          <Day  events={this.props.events} 
                day={day} 
                key={day.date} 
                templates = {this.props.templates}
                />
        ))}
      </div>
    );
  }
}

export default Week;
