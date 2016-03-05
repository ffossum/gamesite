import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/login';
import {uniqueId} from 'util/uniqueId';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.formState.username,
      password: props.formState.password
    };

    this.usernameId = uniqueId('username');
    this.passwordId = uniqueId('password');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleChange.bind(this, 'username');
    this.handleUsernameBlur = this.handleBlur.bind(this, 'username');
    this.handlePasswordChange = this.handleChange.bind(this, 'password');
    this.handlePasswordBlur = this.handleBlur.bind(this, 'password');
  }
  componentWillReceiveProps(nextProps) {
    const {username, password} = nextProps.formState;
    this.setState({
      username,
      password
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const {logIn, formState} = this.props;
    if (!formState.pending) {
      const {username, password} = this.state;
      logIn(username, password);
    }
  }
  handleChange(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }
  handleBlur(field, e) {
    const {formState, updateForm} = this.props;
    if (formState[field] != e.target.value) {
      updateForm({
        [field]: e.target.value
      });
    }
  }
  render() {
    if (this.props.loggedInUser) {
      return null;
    }
    const {error, pending} = this.props.formState;
    const {username, password} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor={this.usernameId}>Username</label>
          <input
            id={this.usernameId}
            type="text"
            required
            value={username}
            onChange={this.handleUsernameChange}
            onBlur={this.handleUsernameBlur}
            autoFocus/>
        </div>

        <div>
          <label htmlFor={this.passwordId}>Password</label>
          <input
            id={this.passwordId}
            type="password"
            required
            value={password}
            onChange={this.handlePasswordChange}
            onBlur={this.handlePasswordBlur} />
        </div>

        {error && <div>Incorrect username and/or password</div>}
        <div>
          <button disabled={pending}>
            Log in
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  formState: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
};

export default connect(
  state => ({
    formState: state.forms.login,
    loggedInUser: state.loggedInUser
  }),
  dispatch => {
    const {logIn, updateForm} = bindActionCreators(actions, dispatch);
    return {
      logIn,
      updateForm
    };
  }
)(LoginForm);
