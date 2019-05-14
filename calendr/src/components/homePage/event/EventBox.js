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
        {/* {this.props.events.map(event => {
            return <div>{event.title}</div>
        })} */}
          <h2>I am an event</h2>
      </div>
    )
  }
}

export default EventBox
