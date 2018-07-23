import React, { Component } from 'react';
import './App.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import {checkLogin, getUser} from './auth';

class App extends Component {
  constructor() {
    super();
    this.state = {selectedDate: new Date(), showModal: true, loggedIn: false};
  }

  componentWillMount() {
    checkLogin(user => {
      if (!user) {
        this.props.history.push('/login');
        return;
      }
      this.setState({loggedIn: true})
    });
  }

  dateSelected = date => {
    this.setState({
      selectedDate: date
    });
    this.openModal(true);
  };

  openModal = (show = false) => {
    this.setState({showModal: show});
  };

  render() {
    return this.state.loggedIn ? <div>
        <InfiniteCalendar onSelect={this.dateSelected} selected={this.state.selectedDate} />

        <div className="modal" hidden={!this.state.showModal}>
          <button className="close" onClick={this.openModal.bind(this, false)}>
            X
          </button>
          hee hee ;)
        </div>
      </div> : '<p>Loading</p>';
  }
}

export default App;
