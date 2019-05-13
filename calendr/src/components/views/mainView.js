import React from "react";
// import MainNavBar from '../general/MainNavBar';
import Users from "../general/Users";
import Home from "../homePage/home/Home";
import Template from "../homePage/template/Template";
import { Route } from "react-router-dom";
import Group from "../homePage/group/Group";
import Event from "../homePage/event/Event";
import MemberHome from "../homePage/member/MemberHome";
import TemplateEdit from "../homePage/template/TemplateEdit";
// import moment from 'moment'
import GeneralCalendar from "../calendar/GeneralCalendar";
import MainCalendar from "../calendar/MainCalendar";

class mainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          exact
          render={(...props) => <Group logOff={this.props.logOff} {...props} />}
        />

        <Route
          path="/home"
          exact
          render={(...props) => <Home logOff={this.props.logOff} {...props} />}
        />

        <Route
          path="/memberhome"
          exact
          render={(...props) => <MemberHome logOff = {this.props.logOff} {...props} />}
        />

        <Route path="/users" component={Users} />

        <Route
          path="/template" 
          exact
          render={(...props) => <Template logOff = {this.props.logOff} {...props} />}
        />
          
        <Route path="/template/edit/:id" component={TemplateEdit} />
        <Route path="/event/" component={GeneralCalendar} />
        <Route path="/template/calendr" component={MainCalendar} />
        <Route path="/event/:date" component={Event} />
      </div>
    );
  }
}

export default mainView;
