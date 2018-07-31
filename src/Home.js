import React, { Component } from 'react';
import { db } from "./constants";
import Settings from './Settings';
import UpdateChain from './UpdateChain';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import './Home.css';
import MdClose from 'react-icons/lib/md/close';
import MdSettings from 'react-icons/lib/md/settings';

class Home extends Component {
  constructor(props) {
    super(props);
    this.emptyDiv = <div />;
    this.state = {
      chains: {},
      dates: {},
      modalContent: this.emptyDiv,
      selectedDate: null,
      showModal: false
    };
  }

  componentDidMount() {
    this.getChains();
  }

  addLeadingZero (n) {
    n = n.toString();
    return n.length === 1 ? '0' + n : n;
  }

  formatDate(date) {
    // returns "yyyy-MM-DD"
    return [date.getFullYear(),
      this.addLeadingZero(date.getMonth() + 1),
      this.addLeadingZero(date.getDate())].join('-');
  }

  setSelectedDate = (date) => {
    this.setState({selectedDate: this.formatDate(date)});
    this.openModal({ show: true, content: <UpdateChain />, modalClass: 'update'});
  }

  openModal = ({show, content = this.emptyDiv, modalClass = ''}) => {
    this.setState({showModal: show, modalContent: content, modalClass: modalClass});
  }

  setStyles(dates) {
    const selectors = Object.keys(dates).map(date => {
      if (!!dates[date].complete) {
        return '#calendar li[data-date="' + date + '"]::after';
      }
      return false;
    }).filter(x => !!x).join(',');

    const styles = [
      selectors,
      '{content: "";',
      'border-radius: 500px;',
      'top: 19%;',
      'left: 0;',
      'position: absolute;',
      'width: 100%;',
      'height: 60%;',
      'background-color: #94c0f9;',
      'z-index: -2;}',
    ].join('');

    document.getElementById('custom-styles').innerHTML = styles;
  }

  getChains() {
    const userData = db.ref('/users/' + this.props.uid);
    userData.on('value', snapshot => {
      const val = snapshot.val();

      if (!val) return;

      this.setState({chains: val.chains || {}, dates: val.dates || {}});
      this.setStyles(val.dates || {});
    });
  }

  render() {
    return (
      <div>
        <MdSettings className="settings-icon" onClick={this.openModal.bind(this, {show: true,
          content: <Settings />
        })} />

        <style id="custom-styles"></style>
        {this.state.chains && <div id="calendar">
          <InfiniteCalendar
            onSelect={this.setSelectedDate.bind(this)}
          />
        </div>}

        <div className={'modal modal-' + this.state.modalClass} hidden={!this.state.showModal}>
          <button className="close" onClick={this.openModal.bind(this, {show: false})}>
            <MdClose />
          </button>
          {React.cloneElement(this.state.modalContent, {
            chains: this.state.chains,
            dates: this.state.dates,
            date: this.state.selectedDate,
            uid: this.props.uid
          })}
        </div>
      </div>
    );
  }
}

export default Home;
