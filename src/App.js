import React, { Component } from 'react';
import './App.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import {loggedIn} from './auth';

class App extends Component {
  constructor() {
    super();
    this.state = {selectedDate: new Date(), showModal: true};
  }

  componentWillMount() {
    if (!loggedIn()) {
      this.props.history.push('/login');
    }
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
    return <div>
        <InfiniteCalendar onSelect={this.dateSelected} selected={this.state.selectedDate} />

        <div className="modal" hidden={!this.state.showModal}>
          <button className="close" onClick={this.openModal.bind(this, false)}>
            X
          </button>
          hee hee ;)
        </div>
      </div>;
  }
}

export default App;
