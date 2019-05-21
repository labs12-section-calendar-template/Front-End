import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'
import Popup from 'reactjs-popup'
import EventEdit from './EventEdit'


export class EventBox extends Component {
  constructor(props) {
    super(props)
  }

  // Delete events  
  deleteEvent = (e, id) => {
    let groupID = localStorage.getItem('group_id')
    axios
      .delete(`${process.env.REACT_APP_API}/events/${id}`)
      .then(res => {
        console.log("event deleted");
        document.location.reload();
        })
      .catch(err => {
        console.log(err);
      });
  };

  editEvent = (e, id) => {
     window.location = `/event/edit/${id}`;
  };


  render() {
    console.log(this.props.events)
    let urlPath = window.location.pathname.split('/');
    console.log(urlPath)
    return (
      <div className="allEvents">
        {this.props.events && this.props.events.map(event => {
          if (urlPath[3] === moment.parseZone(event.date).format('YYYY-MM-DD')) {
            return <div key={event.id} className="event">
                  <div className="event-icons">
                    <i
                      className="far fa-edit iconSize"
                      onClick={e => this.editEvent(e, event.id)}
                    />
                    <i
                      className="fas fa-trash iconSize"
                      onClick={e => this.deleteEvent(e, event.id)}
                    />
                  </div>
            <h5>{event.title}</h5>
            <p>{event.description}</p>
            <p>{moment(event.date).format('dddd, MMM Do')}</p>
            <p>{event.startTime} - {event.endTime}</p>
            </div>
          }
        })}
      </div>
    )
  }
}

export default EventBox
