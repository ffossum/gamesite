import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/login';

export default class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        {
          this.props.loggedInUser &&
          <div>
            <div>User id: {this.props.loggedInUser}</div>
            <button onClick={this.props.logOut}>Log out</button>
          </div>
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
