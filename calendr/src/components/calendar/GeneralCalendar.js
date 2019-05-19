// import React, { Component } from "react";
// import moment from "moment";
// import DayNames from "./DayNames";
// import Week from "./Week";
// import "./GeneralCalendar.scss";
// import axios from "axios";

// export class GeneralCalendar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       month: moment(),
//       latestEvent: [],
//       events: [],
//       template_id: []
//     };
//   }
//   componentDidMount() {
//     this.getTemplateId();
//   }
//   getTemplateId = event => {
//     let group_id = localStorage.getItem("group_id");
//     axios
//       .get(`${process.env.REACT_APP_API}/groups/${group_id}/templates`)
//       .then(res => {
//         let value = res.data[res.data.length - 1].id;
//         let tempIds = res.data.map(data => {
//           return data.id;
//         });

//         // console.log(group_id);

//         this.setState({
//           template_id: tempIds[tempIds.length - 1]
//         });
//         console.log(value);
//         this.getEvents(value);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   getEvents = value => {
//     axios
//       .get(`${process.env.REACT_APP_API}/templates/${value}/events`)
//       .then(res => {
//         let events = res.data.map(event => {
//           return event;
//         });

//         this.setState({
//           latestEvent: events[events.length - 1],
//           events: events
//         });
//         // console.log(this.state.events)
//         // console.log(events)
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   renderWeeks() {
//     let weeks = [];
//     let done = false;
//     let date = this.state.month
//       .clone()
//       .startOf("month")
//       .day("Sunday");
//     let count = 0;
//     let monthIndex = date.month();

//     const { month } = this.state;

//     while (!done) {
//       weeks.push(
//         <Week
//           events={this.state.events}
//           latestEvent={this.state.latestEvent}
//           template_id={this.state.template_id}
//           key={date}
//           date={date.clone()}
//           month={month}
//         />
//       );

//       date.add(1, "week");

//       done = count++ > 2 && monthIndex !== date.month();
//       monthIndex = date.month();
//     }
//     return weeks;
//   }

//   delayRedirect = event => {
//     let takeMeHome = localStorage.getItem('group_id')
//     const {
//       history: { push }
//     } = this.props;
//     push(`/home/${takeMeHome}`);
//   };

//   render() {
//     return (
//       <div className="wholeCalendar">
//         <h1>CALENDR</h1>
//         <p>Click a date to add an event.</p>
//         <DayNames />
//         <div className='cal'>{this.renderWeeks()}</div>
//         <button onClick={this.delayRedirect}>SUBMIT</button>
//       </div>
//     );
//   }
// }

// export default GeneralCalendar;