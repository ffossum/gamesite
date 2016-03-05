import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/login';

import styles from './nav.css';

export default class Nav extends React.Component {
  render() {
    return (
      <nav role="navigation" className={styles.navbar}>
        <div className={styles['nav-item']}>
          <Link to="/">Main</Link>
        </div>

        {
          this.props.loggedInUser
          ?
          <ul>
            <li className={styles.user}>
              User id: {this.props.loggedInUser}
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
  loggedInUser: PropTypes.string,
  logOut: PropTypes.func.isRequired
};

export default connect(
  state => ({
    loggedInUser: state.loggedInUser
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Nav);
