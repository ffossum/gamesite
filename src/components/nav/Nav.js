import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import GamesDropdown from './GamesDropdown';
import UserDropdown from './UserDropdown';
import _ from 'lodash';
import {
  LOGIN_MODAL,
  REGISTER_MODAL,
} from 'constants/modalType';

import styles from './nav.css';

export default class Nav extends React.Component {
  constructor() {
    super();

    this.openLoginModal = this.openModal.bind(this, LOGIN_MODAL);
    this.openRegisterModal = this.openModal.bind(this, REGISTER_MODAL);
  }
  openModal(modalType, e) {
    e.preventDefault();
    this.props.openModal(modalType);
  }
  render() {
    const { user, games } = this.props;

    return (
      <nav role="navigation" className={styles.navbar}>
        <ul className={styles.navgroup}>
          <li>
            <IndexLink
              to="/"
              className={styles.navlink}
            >Main</IndexLink>
          </li>
          <li>
            <Link
              to="/play"
              activeClassName={styles.active}
              className={styles.navlink}
            >Play</Link>
          </li>
          <li>
            <Link
              to="/about"
              activeClassName={styles.active}
              className={styles.navlink}
            >About</Link>
          </li>
        </ul>

        {
          user ?
            <ul className={styles.navgroup}>
              <li><GamesDropdown games={games} /></li>
              <li><UserDropdown user={user} logOut={this.props.logOut} /></li>
            </ul>
          :
            <ul className={styles.navgroup}>
              <li>
                <a className={styles.navlink} href="" onClick={this.openLoginModal}>Log in</a>
              </li>
              <li>
                <a className={styles.navlink} href="" onClick={this.openRegisterModal}>Register</a>
              </li>
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
  games: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
