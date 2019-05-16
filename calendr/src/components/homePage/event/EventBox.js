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
      let urlPath = window.location.pathname.split('/');
    return (
      <div className="allEvents"> 
        {this.props.events && this.props.events.map(event => {
          if(urlPath[2] === event.date){
            return <div key={event.id} className="event">
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
