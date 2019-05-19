import React from "react";
import { Route, withRouter } from "react-router-dom";
import moment from "moment";
import Popup from "reactjs-popup";
import Event from "../homePage/event/Event";
//import axios from "axios";
import "../homePage/event/Event.css"

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      check: moment(this.props.day.date._d).format("YYYY-MM-DD"),
      
    };
  }
  

  toggleOpen = () => {
    this.props.history.push(`/event/${this.state.check}`);
  };

  

  render() {
    console.log("events", this.props.events)
    const filteredEvent = this.props.events.filter(event => {
  
      if (moment(this.props.day.date._d).format("YYYY-MM-DD") === moment(event.date).format('YYYY-MM-DD')) {
        console.log('first', moment(this.props.day.date._d).format("YYYY-MM-DD"), moment(event.date).format('YYYY-MM-DD'))
        return event; 
       }
    });
    const {
      day: { date, number }
    } = this.props;
    return (
      <>
        <div className="day" key={date.toString()} onClick={this.toggleOpen}>
            <div className="eventInfo">

              {filteredEvent.map(event => (
                <p key = {event.id} style={{ fontSize: "12px" }}> {event.startTime} - {event.title}</p>
              ))}
              
            </div>
          <div className="dayNumber">
            {number}
          </div>

        </div>
        <Route
          path={`/event/${this.state.check}`}
          render={() => (
            <Popup
            className="modal-popup"
              open={true}
              onClose={() => this.props.history.push(`/template/calendr/${localStorage.getItem('template_id')}`)}
              position="right center"
              // style={{ max-width: "80%"}}
            >
              <Event 
              check={this.state.check} 
              history={this.props.history} 
              events={this.props.events}
              />
            </Popup>
          )}
        />
      </>
    );
  }
}

export default withRouter(Day);
