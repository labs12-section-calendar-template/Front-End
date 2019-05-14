import React, { Component } from 'react'
import axios from 'axios'

export class EventBox extends Component {
  constructor(props){
      super(props)
      this.state ={
          displayEvents: []
      }
  }

  componentDidMount = () => {
      this.setState({
          displayEvents:this.props.events
      })
  }

  render() {
      console.log(this.state.displayEvents)
    return (
      <div> 
        {this.props.events && this.props.events.map(event => {
            return <div key={event.id}>
            {event.title}<br/>
            {event.description}<br/>
            {event.startTime}<br/>
            {event.endTime}<br/>
            {event.date}
            </div>
        })}
          <h2>I am an event</h2>
      </div>
    )
  }
}

export default EventBox
