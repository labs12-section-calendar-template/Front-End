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
            <h1>View Your Group's Events Here</h1>
            <MemberSideBar/>
            <MemberCalendar/>
        </div> 

        );
    }

}
 
export default MemberHome;