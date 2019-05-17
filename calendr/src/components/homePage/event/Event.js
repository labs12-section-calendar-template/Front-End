import React from "react";
import "./Event.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import EventBox from "./EventBox.js";
import moment from "moment";
// import Day from '../../calendar/Day'
//import DayNames from "../../calendar/DayNames.js";
import { withRouter } from 'react-router-dom'
// import EventToggle from "./EventToggle.js";
import Selected from './Selected'

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: 0,
      endTime: 0,
      title: "",
      description: "",
      date: this.props.check,
      template_id: [],
      week: [],
      startDate: '',
      endDate: '',
      sum: '',
    };
  }

  componentDidMount() {
    this.getTemplateId();
    this.getTemplateById();
    this.getFullWeek(this.props.match.params.date);
  }


  getFullWeek = (yyyymmdd) => {
    let beginningOfWeek = moment(new Date(yyyymmdd)).startOf('week')

    let days = []

    for (let i = 0; i < 7; i++) {
      let newDay = new Date(beginningOfWeek);

      newDay.setDate(newDay.getDate() + i)

      let formattedNewDay = moment(newDay).format('YYYY-MM-DD')

      days.push(formattedNewDay)
    }
    if (days[0] !== "Invalid date") {
      this.setState({
        week: days
      })
    }
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
    let tempId = localStorage.getItem('template_id')
    this.props.history.push(`/template/calendr/${tempId}`);
  };
  handleStartTimeChange = (time) => {
    this.setState({ startTime: time })
  }

  handleEndTimeChange = (time) => {
    this.setState({ endTime: time })
  }


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
        // this.getTemplateById()
      })
      .catch(err => {
        console.log(err);
      });
  };

  getTemplateById = () => {
    let id = localStorage.getItem('template_id')
    axios.get(`${process.env.REACT_APP_API}/templates/${id}`)
      .then(res => {
        let urlPath = window.location.pathname.split('/')[2]
        console.log(moment.duration(moment(res.data.endDate).diff(moment(urlPath))).asWeeks())
        console.log(res.data.endDate)
        this.setState({
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          sum: moment.duration(moment(res.data.endDate).diff(moment(urlPath))).asWeeks()

        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addEvent = () => {
    let { startTime, endTime, title, description, sum } = this.state;
    for (let i = 0; i <= sum; i++) {
      console.log(this.state.sum)
      axios
        .post(
          `${process.env.REACT_APP_API}/templates/${localStorage.getItem('template_id')}/events`, {
            startTime,
            endTime,
            title,
            description,
            date: moment(this.props.match.params.date).add(i, 'week').format('YYYY-MM-DD')
          })
        .then(res => {
          console.log(res.data.date);
          //window.location = "/event";
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.props.match.params.date)
    console.log(this.props.events)
    return (
      <>
        <div className="event-view-wrapper">
          <div className="event-view-container">
            <button className='close-popup' onClick={this.toggleClose}>X</button>
            <EventBox events={this.props.events} />
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
                <div className='eventTitle'>
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

            <Selected
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              handleStartTimeChange={this.handleStartTimeChange}
              handleEndTimeChange={this.handleEndTimeChange}
              handleChange={this.handleChange}
            >

            </Selected>
          </div>

          <button
            className="save-event-button"
            onClick={() => {
              this.addEvent();
              this.props.history.push(`/template/calendr/${localStorage.getItem('template_id')}`)
            }}
          >
            Save
            </button>
        </div>

      </>
    );
  }
}
export default withRouter(Event);