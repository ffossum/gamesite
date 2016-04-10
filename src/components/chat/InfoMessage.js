import React, { PropTypes } from 'react';
import moment from 'moment';
import getText from './getText';

import styles from './message.css';

export default class InfoMessage extends React.Component {
  render() {
    const {
      time,
      key,
      args,
    } = this.props.message;

    return (
      <div className={styles.message}>
        <div>
          <span className={styles.info}>{getText(key, ...args)}</span>
          {' '}
          <span className={styles.time}>{moment(time).format('hh:mm')}</span>
        </div>
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