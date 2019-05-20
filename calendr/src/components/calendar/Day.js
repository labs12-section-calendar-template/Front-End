import React from "react";
import { Route, withRouter } from "react-router-dom";
import moment from "moment";
import Popup from "reactjs-popup";
import Event from "../homePage/event/Event";
//import axios from "axios";
import "../../App.scss"

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      check: moment(this.props.day.date._d).format("YYYY-MM-DD"),
    };
  }
  

  toggleOpen = (e) => {
    e.preventDefault();
    console.log(moment.parseZone(this.props.day.date._d).format("YYYY-MM-DD"))
    this.props.history.push(`/template/calendr/${moment.parseZone(this.props.day.date._d).format("YYYY-MM-DD")}`);
  };


  render() {
    // for making sure that the date an event is created for populates the correct date
    const filteredEvent = this.props.events.filter(event => {
      if (moment.parseZone(this.props.day.date._d).format("YYYY-MM-DD") === moment.parseZone(event.date).format('YYYY-MM-DD')) {
        return event; 
       }
    });
    const { day: { date, number } } = this.props;
    return (
      <>
        <div className="day" key={date.toString()} onClick = {this.toggleOpen}>
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
            <div className="popup-overlay">
            <div className="popup-content modal-popup" 
              open={true}
              onClose={() => this.props.history.push(`/template/calendr/${localStorage.getItem('template_id')}`)}
              position="right center"
              >

              <Event 
              check={this.state.check} 
              history={this.props.history} 
              events={this.props.events}
              />
            
            </div>
            </div>
          )}
        />
      </>
    );
  }
}

export default withRouter(Day);
