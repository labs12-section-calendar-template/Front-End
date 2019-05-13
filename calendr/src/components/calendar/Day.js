import React from "react";
import { Route, withRouter } from "react-router-dom";
import moment from "moment";
import Popup from "reactjs-popup";
import Event from "../homePage/event/Event";
import axios from "axios";

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      check: moment(this.props.day.date._d).format("YYYY-MM-DD"),
      events: [],
      template_id: []
    };
  }
  // componentDidMount() {
  //   this.getTemplateId();
  // }
  // getTemplateId = event => {
  //   let group_id = localStorage.getItem("group_id");
  //   axios
  //     .get(`http://localhost:3300/groups/${group_id}/templates`)
  //     .then(res => {
  //       let value = res.data[0].id;
  //       let tempIds = res.data.map(data => {
  //         return data.id;
  //       });

  //       // console.log(group_id);

  //       this.setState({
  //         template_id: tempIds[tempIds.length - 1]
  //       });
  //       console.log(value);
  //       this.getEvents(value);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  toggleOpen = () => {
    this.props.history.push(`/event/${this.state.check}`);
  };

  // getEvents = value => {
  //   axios
  //     .get(`http://localhost:3300/templates/${value}/events`)
  //     .then(res => {
  //       let events = res.data.map(event => {
  //         return event.title;
  //       });
  //       // console.log(events);
  //       this.setState({
  //         events: events[events.length - 1]
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    const filteredEvent = this.props.events.filter(event => {
      if (event.date === this.state.check) {
        return event.title;
      }
    });
    //console.log(this.props.events)
    const {
      day: { date, number }
    } = this.props;
    return (
      <>
        <div className="day" key={date.toString()} onClick={this.toggleOpen}>
          <p className="dayNumber">
            {/* {this.props.events} */}
            {/* {this.props.latestEvent} */}
            {number}
            <div>
              {filteredEvent.map(e => (
                <div style={{ fontSize: "12px" }}>{e.title}</div>
              ))}
            </div>
          </p>

        </div>
        <Route
          path={`/event/${this.state.check}`}
          render={() => (
            <Popup
              open={true}
              onClose={() => this.props.history.push("/event")}
              position="right center"
              className="annoying-popup"
            >
              <Event check={this.state.check} history={this.props.history} />
            </Popup>
          )}
        />
      </>
    );
  }
}

export default withRouter(Day);
