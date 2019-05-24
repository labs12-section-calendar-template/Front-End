import React from "react";
import '../../../App.scss'
// import { Link } from "react-router-dom";
import axios from "axios";
import EventBox from "./EventBox.js";
import moment from "moment";
// import Day from '../../calendar/Day'
//import DayNames from "../../calendar/DayNames.js";
import { withRouter } from 'react-router-dom'
// import EventToggle from "./EventToggle.js";
import Selected from './Selected'
import { toast } from "react-toastify";
import axiosCustom from "../../../axiosCustom";

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.check,
      week: [],
      description: '',
      title: ''
    };
  }

  componentDidMount() {
    // this.getTemplateId();
    // this.getTemplateById();
    this.getFullWeek(this.props.match.params.date);
  }

  // gets the full week starting from monday when a day is clicked on
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

  // Probably don't need this
  toggleDay(day) {
    // this.setState({ [day]: !this.state[day] });
  }

  // reads the input of the event inputs and sets them to state
  handleChanges = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // x button on the event creation page to close the page
  toggleClose = event => {
    event.preventDefault();
    let tempId = localStorage.getItem('template_id')
    this.props.history.push(`/template/calendr/${tempId}`);
  };

  // // adding event, add a single event or add events coving the total length of the template
  addEvent = () => {
    let temppId = localStorage.getItem('template_id')
    let { startTime, endTime } = this.props;
    let { title, description } = this.state;
    let newStart = moment(new Date(startTime)).format("LT")
    let newEnd = moment(new Date(endTime)).format("LT")
    let urlPath = window.location.pathname.split('/')[3]
    let sum = moment.duration(moment(this.props.endDate).diff(moment(urlPath))).asWeeks()
    console.log("YOOO", sum, this.props.repeat)
    if(this.props.repeat === 1){
    console.log(newStart)
    toast.success('Your events are loading')
    for (let i = 0; i <= sum; i++) {
      console.log(this.props.sum)
      axiosCustom
        .post(
          `${process.env.REACT_APP_API}/templates/${temppId}/events`, {
            startTime: newStart,
            endTime: newEnd,
            title,
            description,
            date: moment(this.props.check).add(i, 'week').format('YYYY-MM-DD'),
            repeat: true
          })
        .then(res => {
          this.props.getEvents(temppId)
          this.props.setStateToEmpty() 
        })
        .catch(err => console.log(err));
    }
    } else {

      axiosCustom
        .post(
          `${process.env.REACT_APP_API}/templates/${temppId}/events`, {
            startTime: newStart,
            endTime: newEnd,
            title,
            description,
            date: moment(this.props.check).format('YYYY-MM-DD'),
            repeat: false
          }
          )
        .then(res => {
          this.props.getEvents(temppId) 
          toast.success('Your event was added!')
          this.props.setStateToEmpty() 
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.props.events)
    return (
      <>
        <div className="event-view-wrapper">
          <div className="event-view-container">
            <h3 className='close-popup' onClick={this.toggleClose}>X</h3>
            
            <EventBox events={this.props.events}
                      deleteEvent={this.props.deleteEvent}
                      colors={this.props.colors}
            />
            <div
              className="top-section"
              style={{
                display: "flex"
              }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div className='eventTitle'>
                  <label>Event Title</label>
                  <input
                    name="title"
                    value={this.props.title}
                    placeholder="Enter event title"
                    onChange={this.handleChanges}
                  />
                </div>
                <div className="description">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={this.state.description}
                    placeholder="Enter details"
                    style={{ height: "100px" }}
                    onChange={this.handleChanges}
                  />
                </div>
                <div>
                  <label>repeat: </label>
                  <select name = "repeat" value = {this.props.repeat} onChange = {this.props.handleChange}> 
                    <option value = {1}>yes</option> 
                    <option value = {0}>no</option>
                  </select>
                </div>
              </form>
            </div>

            <Selected
              startTime={this.props.startTime}
              endTime={this.props.endTime}
              handleStartTimeChange={this.props.handleStartTimeChange}
              handleEndTimeChange={this.props.handleEndTimeChange}
              handleChange={this.props.handleChange}
            />


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