import React from "react";
import Selected from "./Selected.js";
import "./Event.css";
import { Link } from "react-router-dom";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: false,
      Su: false,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      S: false,
      time: "",
      title: "",
      details: ""
    };
  }
  toggleDay(day) {
    this.setState({ [day]: !this.state[day] });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
  })
  }

  toggleClose = event => {
  event.preventDefault()
 this.props.history.push('/event')
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
                onClick={() => this.toggleDay("S")}
              >
                Su
              </div>
              <div
                className={`${this.state.M && "active"} weekday`}
                onClick={() => this.toggleDay("M")}
              >
                M
              </div>
              <div
                className={`${this.state.T && "active"} weekday`}
                onClick={() => this.toggleDay("T")}
              >
                T
              </div>
              <div
                className={`${this.state.W && "active"} weekday`}
                onClick={() => this.toggleDay("W")}
              >
                W
              </div>
              <div
                className={`${this.state.Th && "active"} weekday`}
                onClick={() => this.toggleDay("Th")}
              >
                Th
              </div>
              <div
                className={`${this.state.F && "active"} weekday`}
                onClick={() => this.toggleDay("F")}
              >
                F
              </div>
              <div
                className={`${this.state.S && "active"} weekday`}
                onClick={() => this.toggleDay("S")}
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

            <button className="save-event-button" onClick= {() => this.props.history.push('/event')}>
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default Event;
