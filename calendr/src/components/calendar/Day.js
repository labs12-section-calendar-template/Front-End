import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Popup from 'reactjs-popup';
import Event from '../homePage/event/Event';


class Day extends React.Component {
state = {
  modalOpen: false
}

toggleOpen = () => {
  this.setState({
    modalOpen: true
  })
}

  render() {
    let check = moment(this.props.day.date._d).format('YYYY-MM-DD');

    const { day: { date, number } } = this.props;
    
    return (
      <>
      <div className='day' to= {`/event/${check}`} key={date.toString()} onClick={this.toggleOpen} >
        <p className="dayNumber">{number}</p> 
      </div>
      <Popup open={this.state.modalOpen} position='right center' className='annoying-popup'>
     <Event />
      </Popup>
      </>
    );
  }
}

export default Day

