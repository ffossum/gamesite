import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Gravatar from 'components/common/Gravatar';

import styles from './nav.css';

export default class Nav extends React.Component {
  render() {
    return (
      <nav role="navigation" className={styles.navbar}>
        <ul className={styles['nav-item']}>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/play">Play</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {
          this.props.user
          ?
          <ul>
            <li className={styles.user}>
              <Gravatar inline emailHash={this.props.user.emailHash} />
              {this.props.user.username}
            </li>
            <li className={styles['nav-item']}>
              <a href="#" onClick={this.props.logOut}>Log out</a>
            </li>
          </ul>
          :
          <ul className={styles['nav-item']}>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        }
      </nav>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    emailHash: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func.isRequired,
};
