// import React, { Component } from "react";
// import dateFns from "date-fns";

// export class Week extends Component {
//   state = {
//     week: new Date()
//   };

//   showWeekdays = () => {
//     const format = "dd";
//     const days = [];
//     let startWeek = dateFns.startOfWeek(this.state.week);

//     for (let i = 0; i < 7; i++) {
//       startWeek.push(
//         <div>{dateFns.format(dateFns.addDays(startWeek, i), format)}</div>
//       );
//     }
//     return <div>{days}</div>;
//   };

//   render() {
//     return <div>{this.showWeekdays()}</div>;
//   }
// }
import React, { Component, Fragment } from "react";

import dateFns from "date-fns";

class Week extends Component {
  state = {
    week: new Date()
  };

  showDays = () => {
    const format = "dd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.week);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div>{dateFns.format(dateFns.addDays(startDate, i), format)}</div>
      );
    }
    return <div>{days}</div>;
  };

  render() {
    return (
      <Fragment>
        <div className="days">{this.showDays()}</div>
      </Fragment>
    );
  }
}

export default Week;
