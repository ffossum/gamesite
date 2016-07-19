import React, { PropTypes } from 'react';
import { map } from 'lodash';
import Gravatar from './Gravatar';
import styles from './horizontalPlayerList.css';

export default class HorizontalPlayerList extends React.Component {
  render() {
    const { users } = this.props;
    return (
      <ul className={styles.players}>
        {
          map(users, user => (
            <li key={user.id || ''} className={styles.player}>
              <Gravatar inline emailHash={user.emailHash} name={user.username} />
              <div className={styles.playerName}>{user.username}</div>
            </li>
          ))
        }
      </ul>
    );
  }
}

HorizontalPlayerList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      emailHash: PropTypes.string,
      username: PropTypes.string,
    }),
  ).isRequired,
};
