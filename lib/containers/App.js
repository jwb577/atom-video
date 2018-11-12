'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { connectToGithub } from '../actions/login'

import MainContainer from '../containers/MainContainer'
import Sidebar from '../containers/Sidebar'

class App extends Component {

  componentWillMount() {
    const { connectToGithub } = this.props
    if (atom.config.get('atom-video.token')) {
      connectToGithub(atom.config.get('atom-video.token'))
    }
  }

  render() {
    const { username } = this.props
    return (
      <div className="atom-video">
        {
          username && <Sidebar />
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { login } = state;
  return {
    username: login.user.username
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    connectToGithub
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
