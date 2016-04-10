'use babel';

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Start extends Component {

  handleBtnGithubClick(event) {
    let input_token = findDOMNode(this.refs.input_token)
    input_token.style.display = "block"
  }

  handleChange(e) {
    const { onGithubClick } = this.props
    if (e.key == 'Enter') {
      connectToGithub(e.target.value)
    }
  }

  render() {
    const { error, onRandomClick } = this.props
    let tokenExists = atom.config.get('atom-video.token')
    return (
      <div className="starting">
        <h1 className="title"> Atom Video 🎥</h1>
        <h2>Call your friends while coding</h2>

        {
          (!tokenExists || error) &&
          <div>
            <a onClick={this.handleBtnGithubClick.bind(this)} ref="button_github" className="btn">Use GitHub username</a> or <a onClick={onRandomClick} className="btn">Be Random</a>
            <input onKeyPress={this.handleChange.bind(this)} ref="input_token" className={'input-token native-key-bindings ' + (error ? 'error' : '')} placeholder="Github Token"/>
          </div>
        }

      </div>
    )
  }

}

export default Start
