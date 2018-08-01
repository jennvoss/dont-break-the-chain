import React, { Component } from 'react';
import { db } from "./constants";
import Toggle from './Toggle';
// import './Update-chain.css';

class UpdateChain extends Component {
  toggleValue = (key, val) => {
    const datesRef = 'users/' + this.props.uid + '/dates/' + this.props.date;
    db.ref(datesRef + '/' + key).set(val);
  }

  getValue(key) {
    return (this.props.dates[this.props.date] || {})[key];
  }

  render() {
    const activeChainKeys = Object.keys(this.props.chains)
      .filter(key => !!this.props.chains[key].show);

    const activeChains = activeChainKeys
      .map(key => Object.assign({key: key}, this.props.chains[key]));

    let previousChains = [];
    const markedDates = this.props.dates[this.props.date];
    if (markedDates) {
      previousChains = Object.keys(markedDates)
        .filter(key => activeChainKeys.indexOf(key) === -1)
        .map(key => Object.assign({ key: key }, this.props.chains[key]));
    }

    return (
      <div className="settings">
        <h1>Did you do the things?</h1>

        <ul className="chain-list">
          {activeChains.map((item) => {
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

          {previousChains.map(item => {
            return (
              <li style={{opacity: '0.25'}} key={item.key}>
                <span>{item.name}</span>
                <Toggle
                  disabled
                  value={!this.getValue(item.key)}
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
