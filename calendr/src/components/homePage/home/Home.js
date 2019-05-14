import React, { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import MainNavBar from "../../general/MainNavBar";
import axios from "axios";
import moment from "moment";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: []
    };
  }

  componentDidMount() {
    this.getTemplate();
  }

  getTemplate = event => {
    let group_id = localStorage.getItem("group_id");
    // console.log(group_id)
    axios
      .get(`${process.env.REACT_APP_API}/groups/${group_id}/templates`)
      .then(res => {
        // console.log(res.data);
        this.setState({
          templates: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  edit = (e, id) => {
    window.location = `/template/edit/${id}`;
  };

  deleteTemplate = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_API}/templates/${id}`)
      .then(res => {
        console.log("template deleted");
        document.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.templates.length < 1) {
      return (
        <div>
          <MainNavBar logOff={this.props.logOff} />
          <SideBar />
          <Link className="buttonLink" to="/template">
            <button className="firstTemplateButton">
              Create your first template
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <MainNavBar logOff={this.props.logOff} />
          <SideBar />
          <div className="allTemplates">
            {this.state.templates.map(template => (
              <div key={template.id} className="templateTag">
                <div className="titleAndIcons">
                  <Link to="/template/calendr">
                    <h2 className="templateTitleTag">{template.title}</h2>
                  </Link>
                  <div className="iconsForTemplates">
                    <i
                      className="far fa-edit iconSize"
                      onClick={e => this.edit(e, template.id)}
                    />
                    <i
                      className="fas fa-trash iconSize"
                      onClick={e => this.deleteTemplate(e, template.id)}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="templateDescription">Description</h3>
                  <p className="templateDescriptionTag">
                    {template.description}
                  </p>
                </div>
                <div>
                  <h3>Last Applied</h3>
                  <p>{moment(template.date).format("YYYY-MM-DD")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Home;
