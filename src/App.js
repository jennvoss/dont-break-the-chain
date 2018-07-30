import React, { Component } from 'react';
import Home from './Home';
import './App.css';
import {checkLogin} from './auth';

class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
  }

  componentWillMount() {
    checkLogin(user => {
      if (!user) {
        this.props.history.push('/login');
        return;
      }
      this.setState({loggedIn: true, uid: user.uid})
    });
  }

  render() {
    return this.state.loggedIn ? <Home uid={this.state.uid} /> : <p>Loading</p>;
  }
}

export default App;
