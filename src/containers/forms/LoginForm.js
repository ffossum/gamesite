import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from 'actions/login';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameBlur = this.handleBlur.bind(this, 'username');
    this.handlePasswordBlur = this.handleBlur.bind(this, 'password');
  }
  handleSubmit(e) {
    e.preventDefault();
    const {logIn, formState} = this.props;
    const {username, password} = formState;
    logIn(username, password);
  }
  handleBlur(field, e) {
    const {updateForm} = this.props;
    updateForm({
      [field]: e.target.value
    });
  }
  render() {
    if (this.props.loggedInUser) {
      return null;
    }

    const {username, password, error, pending} = this.props.formState;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          isRequired
          defaultValue={username}
          onBlur={this.handleUsernameBlur} />

        <label>Password</label>
        <input
          type="password"
          isRequired
          defaultValue={password}
          onBlur={this.handlePasswordBlur} />

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
  dispatch => bindActionCreators(actions, dispatch)
)(LoginForm);
