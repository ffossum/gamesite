import React, { PropTypes } from 'react';
import Gravatar from 'components/common/Gravatar';
import getTimestamp from './getTimestamp';
import styles from './message.css';

export default class Message extends React.Component {
  render() {
    const {
      user,
      time,
      text,
    } = this.props.message;

    return (
      <div className={styles.message}>
        <div className={styles.avatar}>
          <Gravatar size="m" emailHash={user.emailHash} />
        </div>
        <div>
          <div>
            <span className={styles.username}>{user.username} </span>
            <span className={styles.time}>{getTimestamp(time)}</span>
          </div>
          <div>{text}</div>
        </div>
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
