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
  
    const { day: { date, number } } = this.props;
    return (
      <>
      
      <div className='day' key={date.toString()} >
        <p className="dayNumber">{number}</p> 
      </div>

      </>
    );
  }
}

export default MemberDay;

