import React from 'react';
import MemberSideBar from './MemberSideBar';
import MemberCalendar from './MemberCalendar'
import './memberHome.scss'

class MemberHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() { 
        return ( 

        <div>
            <h1> This is where members get routed</h1>
            <MemberSideBar/>
            <MemberCalendar/>
        </div> 

        );
    }

}
 
export default MemberHome;