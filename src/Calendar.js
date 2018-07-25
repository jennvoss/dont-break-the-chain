import React, { Component } from 'react';
import { db } from "./constants";
import ToggleButton from 'react-toggle-button';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import './Calendar.css';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(),
      showModal: true,
      newName: '',
      chains: []
    };
  }

  componentDidMount() {
    this.getChains();
  }

  dateSelected = date => {
    this.setState({selectedDate: date});
    this.openModal(true);
  };

  openModal = (show = false) => {
    this.setState({showModal: show});
  };

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    this.addNewChain();
  };

  getChains() {
    const chains = db.ref('/users/' + this.props.uid + '/chains/');
    chains.on('value', snapshot => {
      this.setState({chains: snapshot.val()});
    });
  }

  addNewChain() {
    const data = {
      name: this.state.newName,
      show: true
    };

    // Get a key for a new chain
    const newKey = db
      .ref()
      .child('/users/' + this.props.uid + '/chains/')
      .push().key;

    const updates = {};
    updates['/users/' + this.props.uid + '/chains/' + newKey] = data;
    return db.ref().update(updates);
  }

  toggleShowValue = (key, val) => {
    db.ref('users/' + this.props.uid + '/chains/' + key + '/show').set(!val);
  }

  render() {
    return (
      <div>
        <InfiniteCalendar
          onSelect={this.dateSelected}
          selected={this.state.selectedDate}
        />

        <div className="modal" hidden={!this.state.showModal}>
          <button className="close" onClick={this.openModal.bind(this, false)}>
            X
          </button>
          <div className="settings">
            <h1>Settings</h1>
            <form onSubmit={this.onSubmit}>
              <label>Create a new chain:</label>
              <input
                type="text"
                name="newName"
                value={this.state.newName}
                onChange={this.handleInputChange}
              />
              <input type="submit" value="Submit" />
            </form>

            <h2>Show/hide chains</h2>
            <ul>
              {Object.keys(this.state.chains).map(key => {
                return (
                  <li key={key}>
                    {this.state.chains[key].name}
                    <ToggleButton
                      value={this.state.chains[key].show}
                      onToggle={this.toggleShowValue.bind(this, key)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
