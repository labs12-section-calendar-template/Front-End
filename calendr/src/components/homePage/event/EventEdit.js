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
import queryString from 'query-string';
import { toast } from "react-toastify";

class EventEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: 0,
      endTime: 0,
      title: "",
      description: "",
      date: document.referrer.split('/')[5],
      template_id: [],
      week: [],
      startDate: '',
      endDate: '',
      sum: '',

      repeat: 1
    };
  }


  componentDidMount() {
    this.getTemplateId();
    this.getTemplateById();
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
  handleChange = event => {
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

  // StartTime handle change setting startTime to state
  handleStartTimeChange = (time) => {
    this.setState({ startTime: time })
  }
  
  // EndTime handle change setting endTime to state 
  handleEndTimeChange = (time) => {
    this.setState({ endTime: time })
  }

  // gets the template information based on the group to be used for getTemplateById
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

  // gets the events created to cover multiple weeks 
  getTemplateById = () => {
    let id = localStorage.getItem('template_id')
    axios.get(`${process.env.REACT_APP_API}/templates/${id}`)
      .then(res => {
        let urlPath = document.referrer.split('/')[5]
        console.log(moment.duration(moment(res.data.endDate).diff(moment(urlPath))).asWeeks())
        console.log(res.data.endDate)
        console.log(urlPath)
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

  // adding event, add a single event or add events coving the total length of the template
  updateEvent = () => {
    //Gets the last section of the url path
    let eventIDAndRepeat = window.location.pathname.split('/')[3]
    //Gets the true or false value of the event being updated
    let eventRepeat = Number(eventIDAndRepeat[eventIDAndRepeat.length - 1])
    //Gets the id of the event being updated
    let urlPath = Number(eventIDAndRepeat.slice(0, eventIDAndRepeat.length - 1))

    let { startTime, endTime, title, description, sum } = this.state;
    let newStart = moment(new Date(startTime)).format("LT")
    let newEnd = moment(new Date(endTime)).format("LT")
    //This if statement ensures that a user cannot repeat update unless
    //The event being update was created by repeat aswell
    if(this.state.repeat === 1 && eventRepeat === 1){
    toast.success('Your events are updating')
    for (let i = 0; i <= sum; i++) {
        urlPath += 1
      console.log(this.state.sum)
      axios
        .put(
          `${process.env.REACT_APP_API}/events/${urlPath-1}`, {
            startTime: newStart,
            endTime: newEnd,
            title,
            description,
            date: moment(this.state.date).add(i, 'week').format('YYYY-MM-DD'),
            repeat: true
          })
        .then(res => {
          // console.log(res.data.date);
          //window.location = "/event";
        })
        .catch(err => console.log(err));
    }
    } else if (this.state.repeat === 1 && eventRepeat === 0){

      axios
        .put(
          `${process.env.REACT_APP_API}/events/${urlPath}`, {
            startTime: newStart,
            endTime: newEnd,
            title,
            description,
            date: moment(this.state.date).format('YYYY-MM-DD'),
            repeat: false
          })
        .then(res => {
          toast.success('Only the selected event could be updated')
        })
        .catch(err => console.log(err));
      } else {
        axios
        .put(
          `${process.env.REACT_APP_API}/events/${urlPath}`, {
            startTime: newStart,
            endTime: newEnd,
            title,
            description,
            date: moment(this.state.date).format('YYYY-MM-DD'),
            repeat: false
          })
        .then(res => {
          toast.success('The event was updated')
        })
        .catch(err => console.log(err));
      }
    } 
   

  render() {
    console.log(window.location.pathname.split('/'))
    console.log(document.referrer.split('/')[5])
    return (
      <>
        <div className="event-view-wrapper">
          <div className="event-view-container">
            <button className='close-popup' onClick={this.toggleClose}>X</button>
            <h1>Update Your Event Below</h1>
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
                <div>
                  <label>repeat: </label>
                  <select name = "repeat" value = {this.state.repeat} onChange = {this.handleChange}> 
                    <option value = {1}>yes</option> 
                    <option value = {0}>no</option>
                  </select>
                </div>
              </form>
            </div>

            <Selected
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              handleStartTimeChange={this.handleStartTimeChange}
              handleEndTimeChange={this.handleEndTimeChange}
              handleChange={this.handleChange}
            />


          </div>

          <button
            className="save-event-button"
            onClick={() => {
              this.updateEvent();
              this.props.history.push(`/template/calendr/${localStorage.getItem('template_id')}`)
            }}
          >
            Update
            </button>
        </div>

      </>
    );
  }
}
export default withRouter(EventEdit);