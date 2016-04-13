import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/login';
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
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
};

class Wrapper extends React.Component {
  render() {
    const props = {
      ...this.props,
      user: this.props.user && this.props.user.toJS(),
    };

    return <Nav {...props} />;
  }
}

Wrapper.propTypes = {
  user: PropTypes.object,
};

export default connect(
  state => {
    const sessionUserId = state.getIn(['session', 'userId']);

    return {
      user: state.getIn(['data', 'users', sessionUserId]),
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);
