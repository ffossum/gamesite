import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/login';
import Gravatar from 'components/common/Gravatar';

import styles from './nav.css';

export default class Nav extends React.Component {
  render() {
    return (
      <nav role="navigation" className={styles.navbar}>
        <div className={styles['nav-item']}>
          <Link to="/">Main</Link>
        </div>

        {
          this.props.user
          ?
          <ul>
            <li className={styles.user}>
              <Gravatar emailHash={this.props.user.emailHash} />
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
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

export default connect(
  state => {
    if (state.loggedInUser) {
      return {
        user: state.data.users[state.loggedInUser]
      };
    } else {
      return {};
    }
  },
  dispatch => bindActionCreators(actions, dispatch)
)(Nav);
