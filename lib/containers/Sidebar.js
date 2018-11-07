'use babel';

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createSession, connectToPeer, destroy } from '../actions/session'

import MainContainer from '../containers/MainContainer'
import SidebarHeader from '../components/SidebarHeader'
import SidebarBody from '../components/SidebarBody'

class Sidebar extends Component {

  componentWillMount() {
    const { user, createSession } = this.props
    createSession(user.username)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.username != this.props.user.username) {
      this.props.destroy()
      this.props.createSession(nextProps.user.username)
    }
  }

  render() {
    const { user, connectToPeer, calling, callTarget } = this.props
    return (
      <div className="sidebar">
        <SidebarHeader user={user} connectToPeer={connectToPeer} calling={calling} callTarget={callTarget} />
        <SidebarBody user={user} />
        <MainContainer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { login, session } = state;
  return {
    user: login.user,
    avatar: login.user ? login.user.avatar : '',
    calling: session.calling,
    callTarget: session.callTarget,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createSession,
    connectToPeer,
    destroy
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
