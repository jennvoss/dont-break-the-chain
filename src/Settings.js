import React, { Component } from 'react';
import { db } from "./constants";
import Toggle from './Toggle';
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      newName: ''
    };
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    this.addNewChain();
  };

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
    this.props.chains[key].show = !val;
  }

  render() {
    return (
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
        <ul className="chains">
          {Object.keys(this.props.chains).map(key => {
            return (
              <li key={key}>
                <span>{this.props.chains[key].name}</span>
                <Toggle
                  value={this.props.chains[key].show}
                  onToggle={this.toggleShowValue.bind(this, key)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Settings;
