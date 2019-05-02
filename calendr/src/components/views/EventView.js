import React from "react";
import Selected from "./Selected.js";
import "./EventView.css";

class EventView extends React.Component {
  constructor() {
    super();

    this.state = {
      Su: false,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      S: false
    };
  }

  toggleSunday() {
    this.setState({ Su: !this.state.Su });
  }
  toggleMonday() {
    this.setState({ M: !this.state.M });
  }
  toggleTuesday() {
    this.setState({ T: !this.state.T });
  }
  toggleWednesday() {
    this.setState({ W: !this.state.W });
  }
  toggleThursday() {
    this.setState({ Th: !this.state.Th });
  }
  toggleFriday() {
    this.setState({ F: !this.state.F });
  }
  toggleSaturday() {
    this.setState({ S: !this.state.S });
  }

  render() {
    return (
      <>
        <div className="event-view-wrapper">
          <div className="event-view-container">
            <div className="headings">
              <h2>{"New Event Title"}</h2>
              <h4>{"Details"}</h4>
            </div>
            <div className="weekday-container">
              <div className="weekday" onClick={() => this.toggleSunday()}>
                Su
              </div>
              <div className="weekday" onClick={() => this.toggleMonday()}>
                M
              </div>
              <div className="weekday" onClick={() => this.toggleTuesday()}>
                T
              </div>
              <div className="weekday" onClick={() => this.toggleWednesday()}>
                W
              </div>
              <div className="weekday" onClick={() => this.toggleThursday()}>
                Th
              </div>
              <div className="weekday" onClick={() => this.toggleFriday()}>
                F
              </div>
              <div className="weekday" onClick={() => this.toggleSaturday()}>
                S
              </div>
            </div>
            <div className="selected-container">
              <Selected day={this.state.Su}>Sunday</Selected>
              <Selected day={this.state.M}>Monday</Selected>
              <Selected day={this.state.T}>Tuesday</Selected>
              <Selected day={this.state.W}>Wednesday</Selected>
              <Selected day={this.state.Th}>Thursday</Selected>
              <Selected day={this.state.F}>Friday</Selected>
              <Selected day={this.state.S}>Saturday</Selected>
            </div>
            <div className="holiday-rule">
              <h4>{"Holiday rule"}</h4>
              <select className="event-select">
                <option>Skip</option>
                <option>Move</option>
              </select>
            </div>
            <button className="save-event-button">Save</button>
          </div>
        </div>
      </>
    );
  }
}
export default EventView;
