import React from "react";
import Selected from "./Selected.js";
import "./Event.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import EventBox from "./EventBox.js";

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
      startTime: "",
      endTime: "",
      title: "",
      description: "",
      date: this.props.check,
      template_id: []
    };
  }

  componentDidMount() {
    this.getTemplateId();
  }

  toggleDay(day) {
    this.setState({ [day]: !this.state[day] });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleClose = event => {
    event.preventDefault();
    this.props.history.push("/event");
  };

  getTemplateId = event => {
    let group_id = localStorage.getItem("group_id");
    axios
      .get(`${process.env.REACT_APP_API}/groups/${group_id}/templates`)
      .then(res => {
        let tempIds = res.data.map(data => {
          return data.id;
        });

        console.log(group_id);
        this.setState({
          template_id: tempIds[tempIds.length - 1]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addEvent = () => {
    let newEvent = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      title: this.state.title,
      description: this.state.description,
      date: this.state.date
    };
    axios
      .post(
        `${process.env.REACT_APP_API}/templates/${this.state.template_id}/events`,
        newEvent
      )
      .then(res => {
        console.log(res.data);
        window.location = "/event";
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props.events)
    return (
      <>
        <div className="event-view-wrapper">
          <div className="event-view-container">
            <button className='close-popup' onClick={this.toggleClose}>X</button>
            <EventBox events = {this.props.events}/>
            <div
              className="top-section"
              style={{
                display: "flex"
              }}
            >
              <form
                type="submit"
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
              <div className= 'eventTitle'>
                  <label>Event Title</label>
                  <input
                    name="title"
                    value={this.state.title}
                    placeholder="Enter event title"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="description">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={this.state.description}
                    placeholder="Enter details"
                    style={{ height: "100px" }}
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="weekday-container">
              <div
                className={`${this.state.Su && "active"} weekday`}
                onClick={() => this.toggleDay("Su")}
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
              <Selected
                time={this.state.time}
                handleChange={this.handleChange}
                day={this.state.Su}
              >
                Sunday
              </Selected>
              <Selected
                time={this.state.time}
                handleChange={this.handleChange}
                day={this.state.M}
              >
                Monday
              </Selected>
              <Selected
                time={this.state.time}
                handleChange={this.handleChange}
                day={this.state.T}
              >
                Tuesday
              </Selected>
              <Selected
                time={this.state.time}
                handleChange={this.handleChange}
                day={this.state.W}
              >
                Wednesday
              </Selected>
              <Selected
                time={this.state.time}
                handleChange={this.handleChange}
                day={this.state.Th}
              >
                Thursday
              </Selected>
              <Selected
                time={this.state.time}
                handleChange={this.handleChange}
                day={this.state.F}
              >
                Friday
              </Selected>
              <Selected
                startTime={this.state.startTime}
                handleChange={this.handleChange}
                day={this.state.S}
              >Start Time:
              </Selected><Selected
                endTime={this.state.endTime}
                handleChange={this.handleChange}
                day={this.state.S}
              ><span>End Time:</span>
              </Selected>
            </div>
            <div className="holiday-rule">
              <h4>{"Holiday rule"}</h4>
              <select className="event-select">
                <option>Skip</option>
                <option>Move</option>
              </select>
            </div>

            <button
              className="save-event-button"
              onClick={() => {
                this.addEvent();
                this.props.history.push("/event");
              }}
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default Event;
