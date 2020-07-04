import React, { Component } from 'react';
import './Init.scss';

export default class InitForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
    }

  usernameChangeHandler = (event) =>  {
    this.setState({
      username: event.target.value
    })
  }

  listenernameChangeHandler = (event) => {
    this.setState({
      listener : event.target.value
    })
  }

  render() {

    return (
      <div className="login">
        <form onSubmit={() => this.props.onSubmit(this.state.username, this.state.listener)} className="form">
           <input
              type="text"
              onChange={this.usernameChangeHandler}
              placeholder="Enter your Username"
              required />
            <input
              type="text"
              onChange={this.listenernameChangeHandler}
              placeholder="Enter your Listener name"
              required />  
            <button className="submit" type="submit" value="Submit">
              Let's Chat
            </button>
         </form>
      </div>
    );
  }
}
