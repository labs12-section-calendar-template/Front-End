import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios'


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


  render() {
    console.log(this.props.events)
    let urlPath = window.location.pathname.split('/');
    console.log(urlPath)
    return (
      <div className="allEvents">
        {this.props.events && this.props.events.map(event => {
          if (urlPath[3] === moment.parseZone(event.date).format('YYYY-MM-DD')) {
            return <div key={event.id} className="event">
                    <i
                      className="fas fa-trash iconSize"
                      onClick={e => this.deleteEvent(e, event.id)}
                    />
                    <i
                      className="far fa-edit iconSize"
                      onClick={e => this.edit(e, event.id)}
                    />
            <h5>{event.title}</h5><br/>
            <p>{event.description}</p><br/>
            <p>{moment.parseZone(event.date).format('YYYY-MM-DD')}</p>
            </div>
          }
        })}
      </div>
    )
  }
}

export default EventBox
