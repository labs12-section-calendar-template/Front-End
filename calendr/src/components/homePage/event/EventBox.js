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


  render() {
    let urlPath = window.location.pathname.split('/');
    return (
      <div>
        {this.props.events && this.props.events.map(event => {
          if (urlPath[2] === event.date) {
            return <div key={event.id}>
              {event.title}<br />
              {event.description}<br />
              {event.date}<br />
              {/* start{event.startTime}<br />
              end{event.endTime} */}
            </div>
          }
        })}
      </div>
    )
  }
}

export default EventBox
