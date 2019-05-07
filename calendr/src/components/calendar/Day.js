import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import moment from 'moment';


class Day extends React.Component {

  render() {
    let check = moment(this.props.day.date._d).format('YYYY-MM-DD');

    const { day: { date, number } } = this.props;
    
    return (
      <NavLink className='day' to= {`/event/${check}`} key={date.toString()} >
        <p className="dayNumber">{number}</p> 
      </NavLink>
    );
  }
}

export default Day

