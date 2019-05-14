import React, { Component } from "react";
import SideBar from "../SideBar";
// import GeneralCalendar from '../../calendar/GeneralCalendar';
import "./Template.css";
import axios from "axios";
// import {Link} from 'react-router-dom';
import MainNavBar from "../../general/MainNavBar";

export class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      color: "",
      date: "",
      template_id: []
    };
  }

  postTemplate = event => {
    let group_id = localStorage.getItem("group_id");
    console.log(group_id);
    let { title, description, startDate, endDate, color } = this.state;
    axios
      .post(`${process.env.REACT_APP_API}/groups/${group_id}/templates`, {
        title,
        description,
        startDate,
        endDate,
        color
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          template_id: res.data
        });
        //console.log(this.state.template_id);
        window.location = "/event";
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleStartDateChange = event => {
    this.setState({
      startDate: event.target.value
    });
  };

  handleEndDateChange = event => {
    this.setState({
      endDate: event.target.value
    });
  };

  handleColorChange = event => {
    this.setState({
      color: event.target.value
    });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <MainNavBar logOff = {this.props.logOff}/>
        <div className="templateCreation">
          <aside className="groupTemplateInfo">
            <SideBar />
          </aside>
          <main className="templateMain">
            <div className="templateTitle">
              <h1>Template Creation</h1>

              <button id="buttonSave" onClick={this.postTemplate}>
                Save
              </button>
            </div>
            <div className="templateEdit">
              <div className="startDate">
                <h3>Start Date:</h3>
                  <input
                    value={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    type="text"
                    name="startDate"
                    placeholder="YYYY-MM-DD"
                  />
                  <h3>End Date:</h3>

                  <input
                    value={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    type="text"
                    name="endDate"
                    placeholder="YYYY-MM-DD"
                  />
                  </div>
                  <div>
                <h3>
                  Template Color:{" "}
                  <select
                    value={this.state.color}
                    onChange={this.handleColorChange}
                  >
                    <option>Select One</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="maroon">Maroon</option>
                    <option value="teal">Teal</option>
                    <option value="navy-blue">Navy Blue</option>
                    <option value="orange">Orange</option>
                    <option value="olive">Olive</option>
                  </select>
                </h3>
              </div>
              <form>
                
                  <h3>Title: </h3>
                  <input
                    onChange={this.handleInputChange}
                    placeholder="Title"
                    value={this.state.title}
                    name="title"
                  />

                  <h3>Description: </h3>
                  <input
                    onChange={this.handleInputChange}
                    placeholder="Description"
                    value={this.state.description}
                    name="description"
                  />
                
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Template;
