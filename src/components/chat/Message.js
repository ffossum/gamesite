import PropTypes from 'prop-types';
import React from 'react';
import Gravatar from 'components/common/Gravatar';
import getTimestamp from 'util/getTimestamp';
import styles from './message.css';
import { isArray } from 'lodash/fp';

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
          <Gravatar size="m" emailHash={user.emailHash} name={user.username} />
        </div>
        <div>
          <div>
            <span className={styles.username}>{user.username} </span>
            <span className={styles.time}>{getTimestamp(time)}</span>
          </div>
          <div>
            {
              isArray(text)
                ? text.map((line, index) => <div key={index}>{line}</div>)
                : text
            }
          </div>
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
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }).isRequired,
};
