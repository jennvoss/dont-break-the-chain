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

  addLeadingZero (n) {
    return n.length === 1 ? '0' + n : n;
  }

  formatDate(date) {
    // returns "yyyy-MM-DD"
    return [date.getFullYear(),
      this.addLeadingZero(date.getMonth() + 1),
      this.addLeadingZero(date.getDate())].join('-');
  }

  toggleValue = (val) => {
    const datesRef = 'users/' + this.props.uid + '/dates/';
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
                  onToggle={this.toggleValue}
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
