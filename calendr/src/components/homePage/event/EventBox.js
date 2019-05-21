import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'
import Popup from 'reactjs-popup'
import EventEdit from './EventEdit'


export class EventBox extends Component {
  constructor(props) {
    super(props);

  } 
 

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
                      className="fas fa-trash iconSize"
                      onClick={e => this.props.deleteEvent(e, event.id)}
                    />
                  
                    <i
                      className="far fa-edit iconSize"
                      onClick={e => this.editEvent(e, event.id)}
                      
                    />
            <h5>{event.title}</h5><br/>
            <p>{event.description}</p><br/>
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
