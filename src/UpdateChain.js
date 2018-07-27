import React, { Component } from 'react';
import { db } from "./constants";
import Toggle from './Toggle';
// import './Update-chain.css';

class UpdateChain extends Component {
  constructor() {
    super();
    this.state = {
      newName: ''
    };
  }

  formatDate(date) {
    // returns "yyyy-M-D"
    return [date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()].join('-');
  }

  toggleValue = (key, val) => {
    const datesRef = 'users/' + this.props.uid + '/chains/' + key + '/dates/';
    db.ref(datesRef + this.formatDate(this.props.date)).set(val);
  }

  getValue(dates) {
    return dates && dates[this.formatDate(this.props.date)];
  }

  render() {
    return (
      <div className="settings">
        <h1>Did you do the things?</h1>

        <ul className="chain-list">
          {Object.keys(this.props.chains).map(key => {
            return (
              <li key={key}>
                <span>{this.props.chains[key].name}</span>
                <Toggle
                  value={!this.getValue(this.props.chains[key].dates)}
                  onToggle={this.toggleValue.bind(this, key)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UpdateChain;
