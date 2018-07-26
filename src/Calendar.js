import React, { Component } from 'react';
import { db } from "./constants";
import Settings from './Settings';
import UpdateChain from './UpdateChain';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import './Calendar.css';
import MdClose from 'react-icons/lib/md/close';
import MdSettings from 'react-icons/lib/md/settings';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(),
      showModal: false,
      modalContent: <div />,
      newName: '',
      chains: []
    };
  }

  componentDidMount() {
    this.getChains();
  }

  dateSelected = date => {
    this.setState({selectedDate: date});
    this.openModal({ show: true, content: <UpdateChain />});
  };

  openModal = ({show, content}) => {
    this.setState({showModal: show, modalContent: content || <div />});
  };

  getChains() {
    const chains = db.ref('/users/' + this.props.uid + '/chains/');
    chains.on('value', snapshot => {
      this.setState({chains: snapshot.val() });
    });
  }

  render() {
    return (
      <div>
        <MdSettings className="settings-icon" onClick={this.openModal.bind(this, {show: true,
          content: <Settings />
        })} />

        <InfiniteCalendar
          onSelect={this.dateSelected}
          selected={this.state.selectedDate}
        />

        <div className="modal" hidden={!this.state.showModal}>
          <button className="close" onClick={this.openModal.bind(this, {show: false})}>
            <MdClose />
          </button>
          {React.cloneElement(this.state.modalContent, {chains: this.state.chains, uid: this.props.uid})}
        </div>
      </div>
    );
  }
}

export default Calendar;
