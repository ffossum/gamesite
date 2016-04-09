import React, { PropTypes } from 'react';
import moment from 'moment';
import getText from './getText';

import styles from './chat.css';

export default class InfoMessage extends React.Component {
  render() {
    const {
      time,
      key,
      args,
    } = this.props.message;

    return (
      <div className={styles.message}>
        {moment(time).format('dddd MMMM Do, hh:mm:ss')} {getText(key, ...args)}
      </div>
    );
  }
}

InfoMessage.propTypes = {
  message: PropTypes.shape({
    time: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    args: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
