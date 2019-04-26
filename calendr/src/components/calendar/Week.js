import React, { Component, Fragment } from "react";

import dateFns from "date-fns";

class Week extends Component {
  state = {
    week: new Date()
  };

  weekDays = () => {
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.week);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div>{dateFns.format(dateFns.addDays(startDate, i), "dd")}</div>
      );
    }
    return days.map(day => <div>{day}</div>);
  };

  render() {
    return (
      <div>
        <div className="days">{this.weekDays()}</div>
      </div>
    );
  }
}

export default Week;