import React, { Component } from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom'
import SideBar from '../SideBar'
import MainNavBar from '../../general/MainNavBar'
import axios from 'axios'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      templates: []
    }
  }

  componentDidMount(){
    this.getTemplate()
  }

  getTemplate = event => {
    let group_id = localStorage.getItem("group_id")
    console.log(group_id)
    axios
      .get(`http://localhost:3300/groups/${group_id}/templates` )
      .then(res => {
        console.log(res.data);
        this.setState({
          templates: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteTemplate = (e, id) => {
    e.preventDefault()
    axios
        .delete(`http://localhost:3300/templates/${id}`)
        .then(res => {
          console.log('template deleted')
          document.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }

  render() {
    console.log(this.state.templates.id)
    if(this.state.templates.length < 1){
    return (
      <div>
        <MainNavBar logOff = {this.props.logOff}/>
        <SideBar/>
        <Link className="buttonLink" to="/template">
        <button className="firstTemplateButton">Create your first template</button>
        </Link>
      </div>
    )
    }else{
      return(
        <div>
          <MainNavBar logOff = {this.props.logOff}/>
          <SideBar/>
          <div className="allTemplates">
           {this.state.templates.map((template) => (<div key={template.id} className="templateTag">
                    <div className="titleAndIcons">
                      <h2 className="templateTitleTag">{template.title}</h2>
                     <div className="iconsForTemplates">
                      <i className="far fa-edit iconSize" onClick={this.editTemplate}/>
                      <i className="fas fa-trash iconSize" onClick={(e) => this.deleteTemplate(e, template.id)}/>
                     </div>
                    </div>  
                    <div>
                    <h3 className="templateDescription">Description</h3>
                    <p className="templateDescriptionTag">{template.description}</p>
                    </div>
                    <div>
                      <h3>Last Applied</h3>
                      <p>{template.date}</p>
                    </div>
                  </div>
          ))}</div>

        </div>
      )
    }
  }
}

export default Home