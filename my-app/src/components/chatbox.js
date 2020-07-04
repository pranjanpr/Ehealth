import React, { Component } from 'react';
import './chatcss.css';
import InitChat from './InitChat'
import Chat from './Chat'
import WebSocketInstance from '../services/WebSocket'

export default class chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      listener: '',
      loggedIn: false
    };
  }

  handleLoginSubmit = (username, listener) => {
    this.setState({ loggedIn: true, username: username, listener: listener});
    WebSocketInstance.connect();
  }

  render() {
    const { 
      loggedIn,
      username,
      listener
    } = this.state;

    return (
      <div className="App">
        { 
          loggedIn ?
          <Chat
            currentUser={username}
            currentlistener={listener}
          />
          :
          <InitChat
            onSubmit={this.handleLoginSubmit}
            usernameChangeHandler={this.usernameChangeHandler}
            listenernameChangeHandler={this.listenernameChangeHandler}
          />
        }
      </div>
    );
  }
}

