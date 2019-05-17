import React, { Component } from 'react'
import axios from 'axios';
// import Popup from 'reactjs-popup';

export class MemberSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // groupName: [],
      // joinCode: [],
      // group_id: [],
      // templates: [],
      modalOpen: false
    }
  }

  // componentDidMount() {
  //   this.getGroup();
  // }

  // getGroup = () => {
  //   let joinCode = localStorage.getItem('joinCode')

  //   axios.post(`${process.env.REACT_APP_API}/groups/getby/joincode`, {joinCode})
  //   .then(res => {
  //       console.log(res.data)
  //       let groupID = res.data.id
  //     this.setState({
  //       group_id: res.data.id,
  //       groupName: res.data.name,
  //       joinCode: res.data.joinCode,
  //     })
      
  //     this.getGroupTemplates(groupID)

  //     console.log(this.state.groupName)
  //     window.localStorage.setItem("group_id", this.state.group_id)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  // getGroupTemplates = (groupID) => {
  //   axios.get(`${process.env.REACT_APP_API}/members/${groupID}/groups`)
  //     .then(res => {
  //       console.log(res.data)
  //       this.setState({
  //         templates: res.data
  //       })
  //     }).catch(err => {
  //       console.log(err)
  //     })
  // }

  toggleModal = () => {
    if (this.state.modalOpen === false) {
      this.setState({
        modalOpen: true,
      })
    } else {
      this.setState({
        modalOpen: false
      })
    }
  }

  render() {
    // console.log(localStorage)
    return (
      <>
        <div className="memberHomeWrapper">

          <div className="groupNameTemplate">
          </div>
          <h5 className='buttonTitles'>Group Name</h5>
            <div className='buttonBox'>
                <h3 className = "groupName">{this.props.group.name}</h3>
            </div>

          <h5 className='buttonTitles'>Templates</h5>
            <div>
                {this.props.templates.map(template => {return <div key={template.id} value = {template.id}>
                  <input
                  type="checkbox"
                  name={template.id}
                  check={template.isChecked}
                  value={template.id}
                  onClick={this.props.singleCheck}
                  />    
                  
                  <h5>{template.title}</h5>
          
                </div>
                })} 
            </div>

        </div>
        {/* <Popup open={this.state.modalOpen} id="groupEditPopup">
        <div toggleModal={this.toggleModal} group_id={this.state.group_id}/>
      </Popup> */}
      </>
    )
  }
}

export default MemberSideBar