import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import moment from 'moment';


class Day extends React.Component {

  render() {
    let check = moment(this.props.day.date._d).format('YYYY-MM-DD');

    const { day: { date, number } } = this.props;
    
    return (
      <NavLink to= {`/month/week/${check}`} key={date.toString()} >
        {number} 
      </NavLink>
    );
  }
}

export default Day

