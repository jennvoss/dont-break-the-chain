import React, { Component } from 'react';
import { dbRef } from "./constants";

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import './Calendar.css';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {selectedDate: new Date(), showModal: true, newName: ''};
  }

  dateSelected = date => {
    this.setState({
      selectedDate: date
    });
    this.openModal(true);
  }

  openModal = (show = false) => {
    this.setState({showModal: show});
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.addNewChain();
  }

  addNewChain() {
    const data = {
      name: this.state.newName
    };

    // Get a key for a new chain
    const newKey = dbRef.child('/users/' + this.props.uid + '/chains/').push().key;
    const updates = {};
    updates['/users/' + this.props.uid + '/chains/' + newKey] = data;

    return dbRef.update(updates);
  }

  render() {
    return <div>
        <InfiniteCalendar onSelect={this.dateSelected} selected={this.state.selectedDate} />

        <div className="modal" hidden={!this.state.showModal}>
          <button className="close" onClick={this.openModal.bind(this, false)}>
            X
          </button>
          {/* <h1>Did you do the thing?</h1> */}
          <div className="settings">
            <h1>Settings</h1>
            <form onSubmit={this.onSubmit}>
              <label>Create a new chain:</label>
              <input type="text" name="newName" value={this.state.newName}
                onChange={this.handleInputChange} />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>;
  }
}

export default Calendar;
