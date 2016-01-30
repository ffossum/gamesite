import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/login';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      pending: false,
      failed: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleChange.bind(this, 'username');
    this.handlePasswordChange = this.handleChange.bind(this, 'password');
  }
  handleSubmit(e) {
    e.preventDefault();
    const {loggedIn} = this.props;
    const {username, password} = this.state;
    this.setState({
      failed: false,
      pending: true
    });
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(async res => {
      this.setState({pending: false});
      if (res.ok) {
        const json = await res.json();
        loggedIn(json.userId);
      } else {
        this.setState({failed: true});
      }
    });
  }
  handleChange(field, e) {
    this.setState({[field]: e.target.value});
  }
  render() {
    const {formState} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>

        <label>Username</label>
        <input
          type="text"
          isRequired
          value={this.state.username}
          onChange={this.handleUsernameChange} />

        <label>Password</label>
        <input
          type="password"
          isRequired
          value={this.state.password}
          onChange={this.handlePasswordChange} />

        {this.state.failed && <div>Incorrect username and/or password</div>}
        <div>
          <button disabled={this.state.pending}>
            Log in
          </button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  loggedIn: PropTypes.func.isRequired
};

export default connect(
  state => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)(LoginForm);
