import React, { Component } from 'react'

export class EventToggle extends Component {
    state = {
        day:this.props.day
    }

    toggleDay(day, e) {
        this.setState({ [day]: !this.state[day] });
      }

    dateToggleInfo = () => {
        let roundToggles = [];
        let daysOfWeek = ['Su','M','T','W','Th','F','S']
        for(let i = 0; i < 7; i++){
          roundToggles.push(<div key={i} value={this.props.week[i]} className={`${this.props[daysOfWeek[i]] && "active"} weekday`}
          onClick={e => this.toggleDay(daysOfWeek[i], e)}>
            {daysOfWeek[i]}
          </div>)
          console.log(this.props.week[i])
        }
        return roundToggles
      }

    render() {
        return (
        <div className="weekday-container">
            {this.props.week && this.dateToggleInfo()}
        </div>
    )
  }
}

export default EventToggle
