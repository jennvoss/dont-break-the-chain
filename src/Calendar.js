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
    this.emptyDiv = <div />;
    this.state = {
      selectedDate: new Date(),
      showModal: false,
      modalContent: this.emptyDiv,
      chains: []
    };
  }

  componentDidMount() {
    this.getChains();
  }

  setSelectedDate = date => {
    this.setState({selectedDate: date});
    this.openModal({ show: true, content: <UpdateChain />, modalClass: 'update'});
  }

  openModal = ({show, content = this.emptyDiv, modalClass = ''}) => {
    this.setState({showModal: show, modalContent: content, modalClass: modalClass});
  }

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
          onSelect={this.setSelectedDate.bind(this)}
        />

        <div className={'modal modal-' + this.state.modalClass} hidden={!this.state.showModal}>
          <button className="close" onClick={this.openModal.bind(this, {show: false})}>
            <MdClose />
          </button>
          {React.cloneElement(this.state.modalContent, {
            chains: this.state.chains,
            date: this.state.selectedDate,
            uid: this.props.uid
          })}
        </div>
      </div>
    );
  }
}

export default Calendar;
