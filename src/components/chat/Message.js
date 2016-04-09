import React, { PropTypes } from 'react';
import Gravatar from 'components/common/Gravatar';
import moment from 'moment';

import styles from './chat.css';

export default class Message extends React.Component {
  render() {
    const {
      user,
      time,
      text,
    } = this.props.message;

    return (
      <div className={styles.message}>
        {moment(time).format('dddd MMMM Do, hh:mm:ss')}
        {' '}
        <Gravatar emailHash={user.emailHash} /> {user.username}: {text}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.shape({
      emailHash: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
