import React, { Component } from 'react';
import { db } from "./constants";
import Toggle from './Toggle';
// import './Update-chain.css';

class UpdateChain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: ''
    };
  }

  toggleValue = (key, val) => {
    const datesRef = 'users/' + this.props.uid + '/dates/' + this.props.date;
    db.ref(datesRef + '/' + key).set(val);
  }

  getValue(key) {
    return (this.props.dates[this.props.date] || {})[key];
  }

  render() {
    const chains = Object.keys(this.props.chains)
      .filter(key => !!this.props.chains[key].show)
      .map(key => Object.assign({key: key}, this.props.chains[key]));

      return (
      <div className="settings">
        <h1>Did you do the things?</h1>

        <ul className="chain-list">
          {chains.map((item) => {
            return (
              <li key={item.key}>
                <span>{item.name}</span>
                <Toggle
                  value={!this.getValue(item.key)}
                  onToggle={this.toggleValue.bind(this, item.key)}
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
