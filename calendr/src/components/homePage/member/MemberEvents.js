import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom'


class MemberEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    toggleClose = () => {
      this.props.history.push('/memberhome')
    }

    render() {
        let urlPath = window.location.pathname.split('/');
        return (

            <div className="event-view-wrapper">
                <div className="event-view-container">
                    <h3 className='close-popup' onClick={this.toggleClose}>X</h3>

                    <div>
              
                        {this.props.events && this.props.events.map(event => {
                              console.log(event) 
                        if (moment.parseZone(urlPath[2]).format('YYYY-MM-DD') === moment.parseZone(event.date).format('YYYY-MM-DD')) {
            
                            return  <div key={event.id} className="event">
                                        <h5>{event.title}</h5><br />
                                        <p>{event.description}</p><br />
                                        <p>{moment.parseZone(event.date).format('dddd, MMM Do')}</p>
                                        <p>{event.startTime} - {event.endTime}</p>
                                    </div>

                            } else {
                                return <h2>You have No Events Today</h2>
                            }
                             
                        })}
                    </div>
                </div>
            </div>


        );
    }
}

export default withRouter(MemberEvents);