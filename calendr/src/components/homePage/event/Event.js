import React from "react";
import "./Event.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import EventBox from "./EventBox.js";
import moment from "moment";
import Day from '../../calendar/Day'
import DayNames from "../../calendar/DayNames.js";
import { withRouter } from 'react-router-dom'
import EventToggle from "./EventToggle.js";


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
      template_id: [],
      week:[],
    };
  }

  componentDidMount() {
    this.getTemplateId();
    this.getFullWeek(this.props.match.params.date)
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.match.params.date !== this.props.match.params.date){
      this.getFullWeek(this.props.match.params.date)
    }
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


  getFullWeek = (yyyymmdd) => {
    let beginningOfWeek = moment(new Date(yyyymmdd)).startOf('week')

    let days = []

    for (let i = 0; i < 7; i++){
      let newDay = new Date(beginningOfWeek);

      newDay.setDate(newDay.getDate() + i)

      let formattedNewDay = moment(newDay).format('YYYY-MM-DD')

      days.push(formattedNewDay)
    }
    if(days[0] !== "Invalid date"){
      this.setState({
        week:days
      }) 
    }
  }




  render() {
    console.log(this.props.match)
    console.log(this.state.week)
    // console.log(this.props.events)
    let { Su, M, T, W, Th, F, S} = this.state
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
            <EventToggle 
            week={this.state.week} 
            toggleDay={this.toggleDay} 
            day={this.state.day} 
            toggleDay={this.toggleDay}
            Su={Su} M={M} T={T} W={W} Th={Th} F={F} S={S}
            />

            
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
export default withRouter(Event);
