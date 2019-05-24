import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios'
import Popup from 'reactjs-popup'
import EventEdit from './EventEdit'

export class EventBox extends Component {
  constructor(props) {
    super(props);
  } 

  borderColor = (id) => {
    let divStyle = {
      border: `1px solid ${this.props.colors[id % 6]}`,
      boxShadow: `1px 1px 3px ${this.props.colors[id % 6]}, 1px 1px 3px ${this.props.colors[id % 6]} inset`
    };
    return divStyle
  }

  editEvent = (e, id) => {
    //Added the events repeat value to the end of the url to use in the update event function
    console.log(e.target.attributes.value.value, true)
    if(e.target.attributes.value.value == "true" || e.target.attributes.value.value == 1){
      window.location = `/event/edit/${id}${1}`;
    } else {
      window.location = `/event/edit/${id}${0}`;
    }
  };

  render() {
    console.log(this.props.events)
    let urlPath = window.location.pathname.split('/');
    console.log(urlPath)
   
    return (
      <div className="allEvents">
      <ReactTooltip/> 

        {this.props.events && this.props.events.map(event => {
          if (moment.parseZone(urlPath[3]).format('YYYY-MM-DD') === moment.parseZone(event.date).format('YYYY-MM-DD')) {
            return <div key={event.id} className="event" style={this.borderColor(event.template_id)}>
                  
                  <div className="event-icons">
                  
                    <i
                      className="far fa-edit iconSize"
                      value = {event.repeat}
                      data-tip='Update event'
                      onClick = {(e) => this.editEvent(e, event.id)}

                    />
                  
                      <i
                      className="fas fa-trash iconSize"
                      value = {event.repeat}
                      onClick={e => this.props.deleteEvent(e, event.id)}
                      data-tip='Delete event'
                    />

                  </div>
                  
            <h5>{event.title}</h5><br/>
            <p>{event.description}</p><br/>
            <p>{moment.parseZone(event.date).format('dddd, MMM Do')}</p>
            <p>{event.startTime} - {event.endTime}</p>
            </div>
          }
        })}
        
      </div>
    )
  }
}

export default EventBox
