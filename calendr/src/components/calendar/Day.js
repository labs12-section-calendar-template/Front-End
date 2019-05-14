import React from "react";
import { Route, withRouter } from "react-router-dom";
import moment from "moment";
import Popup from "reactjs-popup";
import Event from "../homePage/event/Event";
import axios from "axios";
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
    const filteredEvent = this.props.events.filter(event => {
      if (event.date === this.state.check) {
        return event;
      }
    });
    
    const {
      day: { date, number }
    } = this.props;
    return (
      <>
        <div className="day" key={date.toString()} onClick={this.toggleOpen}>
          <div className="dayNumber">
      
            
            <div>

              {filteredEvent.map(event => (
                <p key = {event.id} style={{ fontSize: "12px" }}>{event.title}</p>
              ))}
        
            </div>
            {number}
          </div>

        </div>
        <Route
          path={`/event/${this.state.check}`}
          render={() => (
            <Popup
            className="modal-popup"
              open={true}
              onClose={() => this.props.history.push("/event")}
              position="right center"
              // style={{ max-width: "80%"}}
            >
              <Event 
              check={this.state.check} 
              history={this.props.history} 
              events = {this.props.events}/>
            </Popup>
          )}
        />
      </>
    );
  }
}

export default withRouter(Day);
