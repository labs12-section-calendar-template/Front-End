import React from 'react'

import MemberDay from './MemberDay';

class MemberWeek extends React.Component {
  render() {
    let days = [];
    let { date } = this.props;
    // Mapping through each day of the week
    for (let i = 0; i <= 6; i++) {
      let day = {
          name: date.format("dd").substring(0, 1),
          number: date.date(),
          date: date
      };
      days.push(
        day
      );

      date = date.clone();
      date.add(1, "day");
    }
    
    // takes in day and applies Day component to the map 
    return (
      <div className="week"> 
      {days.map(day =>( 
        <MemberDay 
        day={day} 
        key={day.date}
        events = {this.props.events}
        templates = {this.props.templates}
        />
      ))}
      </div>
    );
  }

}

export default MemberWeek
