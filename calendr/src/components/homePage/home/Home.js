import React, { Component } from "react";
import "../../../App.scss";
import { Link, withRouter } from "react-router-dom";
import SideBarSlide from "../SideBarSlide";
import SideBar from "../SideBar";
import MainNavBar from "../../general/MainNavBar";
import axios from "axios";
import axiosCustom from "../../../axiosCustom";
import moment from "moment";
import { toast } from 'react-toastify';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
     // index: '',
      group_id: []
    };
  }

  // mounts get template function
  componentDidMount = () => {
    this.getTemplate();
  }

  // updates get template if the url changes 
  componentDidUpdate = (prevProps) => {
    if (prevProps.match.url !== this.props.match.url) {
      this.getTemplate()
    }
  }

  // Probably not needed
  indexClick = (event) => {
    // event.preventDefault()
    // this.setState({ [event.target.index]: event.target.value })
    // console.log(this.state.index)
  }

  // Gets current template info, based on the most recent created
  getTemplate = event => {
    let urlPath = window.location.pathname;
    let lateNight = urlPath.split('/')
    axiosCustom
      .get(`/groups/${lateNight[2]}/templates`)
      .then(res => {
        this.setState({
          templates: res.data,
          group_id: lateNight[2]
        });
        // window.localStorage.setItem("group_id", this.state.group_id)
      })
      .catch(err => {
        console.log(err);
      });
  };

  // onClick redirect to edit window for templates
  edit = (e, id) => {
    window.location = `/template/edit/${id}`;
  };

  // remove all information of template selected
  deleteTemplate = (e, id) => {
    e.stopPropagation();
    let groupID = localStorage.getItem('group_id')
    axiosCustom
      .delete(`${process.env.REACT_APP_API}/templates/${id}`)
      .then(res => {
        console.log("template deleted");
        
       this.props.history.push(`/home/${groupID}`);
       document.location.reload();
        let newTemps = this.state.templates.filter(temp => {
          return temp.id !== id
        })
       this.setState({
         templates: newTemps
       }, () =>  toast.success('Template Deleted'));
       
      })
      .catch(err => {
        console.log(err);
      });
  };

  // on clicking a template name, localStorage changes to new template ID
  clickingTemplatesFunction = (templateId) => {
    let templates = this.state.templates
    console.log(templates)
    templates.forEach(template => {
      console.log(templateId)
      if (templateId == template.id) {
        window.localStorage.setItem("template_id", templateId)
        this.props.history.push(`/template/calendr/${template.id}`)
      }
    })
  }

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
          <SideBarSlide />
          <SideBar />
          <div className="allTemplates">

            {this.state.templates.map(template => (
              <div key={template.id} value={template.id} className="templateTag" onClick={() => { this.clickingTemplatesFunction(template.id) }}>

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

export default withRouter(Home);
