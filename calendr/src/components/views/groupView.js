import React, { Component } from 'react'
import Group from '../homePage/group/Group'
import { Route } from 'react-router-dom'

export class groupView extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Group} />
      </div>
    )
  }
}

export default groupView
