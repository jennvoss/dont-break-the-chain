import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';
import MdCheck from 'react-icons/lib/md/check';

const styles = {
  trackStyle: {
    height: 15,
  },
  thumbStyle: {
    position: 'absolute',
    width: 30,
    height: 30,
    boxShadow: `0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)`
  },
  iconStyle: {
    color: 'white',
    margin: '5px',
    width: '20px',
    height: '20px'
  }
};

const Toggle = (props) => {
  return (
    <ToggleButton
      value={props.value}
      onToggle={props.onToggle}
      inactiveLabel={''}
      activeLabel={''}
      colors={{
        activeThumb: {
          base: 'rgb(250,250,250)',
        },
        inactiveThumb: {
          base: 'rgb(62,130,247)',
        },
        active: {
          base: 'rgb(207,221,245)',
          hover: 'rgb(177, 191, 215)',
        },
        inactive: {
          base: 'rgb(65,66,68)',
          hover: 'rgb(95,96,98)',
        }
      }}
      trackStyle={styles.trackStyle}
      thumbStyle={styles.thumbStyle}
      thumbAnimateRange={[-10, 36]}
      thumbIcon={<MdCheck style={styles.iconStyle} />}
    />
  );
}

export default Toggle;
