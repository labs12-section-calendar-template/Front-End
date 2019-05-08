import React from "react";
import Selected from "./Selected.js";
import "./Event.css";
import { Link } from 'react-router-dom'

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Su: false,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      S: false,
      time: "",
      title: "",
      details: "",

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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
  })
  }

  toggleClose = event => {
  event.preventDefault()
 this.props.history.push('/template')
}


  render() {
    return (
      <>
        <div className="event-view-wrapper">
          <div className="event-view-container">
          <button onClick={this.toggleClose}>X</button>
            <div
              className="top-section"
              style={{
                display: "flex",
                width: "450px"
              }}
            >
              <form
                type="submit"
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <label>Event Title</label>
                <input
                  name="title"
                  value={this.state.title}
                  placeholder="Enter event title"
                  onChange={this.handleChange}
                />
                <label>Details</label>
                <textarea
                  name="details"
                  placeholder="Enter details"
                  style={{ height: "100px" }}
                />
              </form>
            </div>
            <div className="weekday-container">
              <div
                className={`${this.state.Su && "active"} weekday`}
                onClick={() => this.toggleSunday()}
              >
                Su
              </div>
              <div
                className={`${this.state.M && "active"} weekday`}
                onClick={() => this.toggleMonday()}
              >
                M
              </div>
              <div
                className={`${this.state.T && "active"} weekday`}
                onClick={() => this.toggleTuesday()}
              >
                T
              </div>
              <div
                className={`${this.state.W && "active"} weekday`}
                onClick={() => this.toggleWednesday()}
              >
                W
              </div>
              <div
                className={`${this.state.Th && "active"} weekday`}
                onClick={() => this.toggleThursday()}
              >
                Th
              </div>
              <div
                className={`${this.state.F && "active"} weekday`}
                onClick={() => this.toggleFriday()}
              >
                F
              </div>
              <div
                className={`${this.state.S && "active"} weekday`}
                onClick={() => this.toggleSaturday()}
              >
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
              
            <button className="save-event-button" onClick={this.toggleClose}>Save</button>
            
          </div>
        </div>
      </>
    );
  }
}
export default Event;
