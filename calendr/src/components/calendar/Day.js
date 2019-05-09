import React, { Component } from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
import Popup from 'reactjs-popup';
import Event from '../homePage/event/Event';


class Day extends React.Component {
  constructor(props) {
    super(props)
  this.state = {
      modalOpen: false,
      check: moment(this.props.day.date._d).format('YYYY-MM-DD')
    }
  }

toggleOpen = () => {
this.props.history.push(`/event/${this.state.check}`)
}

  render() {
  
    const { day: { date, number } } = this.props;
    return (
      <>
      <div className='day' key={date.toString()} onClick={this.toggleOpen} >
        <p className="dayNumber">{number}</p> 
      </div>
      <Route path={`/event/${this.state.check}`} render={() => (
      <Popup open={true} onClose= {() => (this.props.history.push('/event'))} position='right center' className='annoying-popup'>
        <Event history={this.props.history}/>
      </Popup>
      )} />
      
      
      </>
    );
  }
}

export default withRouter(Day);

