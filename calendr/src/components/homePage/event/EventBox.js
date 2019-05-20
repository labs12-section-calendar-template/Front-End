import React, { Component } from 'react'
import axios from 'axios'


export class EventBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayEvents: []
    }
  }

  componentDidMount = () => {
    this.setState({
      displayEvents: this.props.events
    })
  }

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
    return (
      <div className="allEvents">
        {this.props.events && this.props.events.map(event => {
          if (urlPath[3] === event.date) {
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
            <p>{event.date}</p>
            </div>
          }
        })}
      </div>
    )
  }
}

export default EventBox
