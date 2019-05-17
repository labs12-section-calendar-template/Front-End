import React from 'react'
// import { NavLink, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
// import Popup from 'reactjs-popup';
// import Event from '../homePage/event/Event';


class MemberDay extends React.Component {
  constructor(props) {
    super(props)
  this.state = {
      modalOpen: false,
      check: moment(this.props.day.date._d).format('YYYY-MM-DD')
    }
  }


  render() {
    const filteredEvent = this.props.events.filter(event => {
      if (event.date === this.state.check) {
        return event;
       }
    });
  
    const { day: { date, number } } = this.props;
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

      </>
    );
  }
}

export default MemberDay;

