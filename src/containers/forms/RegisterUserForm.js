import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions, { errors as errorTypes } from 'actions/registerUser';
import modalActions from 'actions/modal';
import { LOGIN_MODAL } from 'constants/modalType';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import { get } from 'lodash';

import styles from './form.css';

class RegisterUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.formState.email,
      username: props.formState.username,
      password: props.formState.password,
      repeatPassword: props.formState.repeatPassword,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleChange.bind(this, 'email');
    this.handleEmailBlur = this.handleBlur.bind(this, 'email');
    this.handleUsernameChange = this.handleChange.bind(this, 'username');
    this.handleUsernameBlur = this.handleBlur.bind(this, 'username');
    this.handlePasswordChange = this.handleChange.bind(this, 'password');
    this.handlePasswordBlur = this.handleBlur.bind(this, 'password');
    this.handleRepeatPasswordChange = this.handleChange.bind(this, 'repeatPassword');
    this.handleRepeatPasswordBlur = this.handleBlur.bind(this, 'repeatPassword');
    this.handleRememberMeChange = this.handleCheckboxChange.bind(this, 'remember');
    this.openLoginModal = this.openLoginModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { email, username, password, repeatPassword } = nextProps.formState;
    this.setState({
      email,
      username,
      password,
      repeatPassword,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { registerUser, formState } = this.props;
    const { pending, remember } = formState;
    if (!pending) {
      const { email, username, password, repeatPassword } = this.state;
      registerUser({
        email,
        username,
        password,
        repeatPassword,
        remember,
      });
    }
  }
  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }
  handleBlur(field, e) {
    const { formState, updateForm } = this.props;
    if (formState[field] !== e.target.value) {
      updateForm({
        [field]: e.target.value,
      });
    }
  }
  handleCheckboxChange(field, e) {
    const { formState, updateForm } = this.props;
    if (formState[field] !== e.target.checked) {
      updateForm({
        [field]: e.target.checked,
      });
    }
  }
  openLoginModal(e) {
    e.preventDefault();
    this.props.openModal(LOGIN_MODAL);
  }
  render() {
    if (this.props.sessionUserId) {
      return null;
    }
    const { errors, pending, remember } = this.props.formState;
    const { email, username, password, repeatPassword } = this.state;

    let emailError;
    if (errors.email === errorTypes.EMAIL_TAKEN) {
      emailError = 'A user with this email already exists.';
    } else if (errors.email === errorTypes.INVALID_EMAIL) {
      emailError = 'Invalid email';
    }

    return (
      <section>
        <h2>Registration</h2>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <TextInput
            label="Email"
            type="email"
            required
            disabled={pending}
            value={email}
            onChange={this.handleEmailChange}
            onBlur={this.handleEmailBlur}
            autoFocus
            error={emailError}
          />

          <TextInput
            label="Username"
            required
            disabled={pending}
            value={username}
            onChange={this.handleUsernameChange}
            onBlur={this.handleUsernameBlur}
            error={errors.username === errorTypes.USERNAME_TAKEN &&
              'Username is already taken.'}
          />

          <TextInput
            label="Password"
            type="password"
            required
            disabled={pending}
            value={password}
            onChange={this.handlePasswordChange}
            onBlur={this.handlePasswordBlur}
          />

          <TextInput
            label="Repeat password"
            type="password"
            required
            disabled={pending}
            value={repeatPassword}
            onChange={this.handleRepeatPasswordChange}
            onBlur={this.handleRepeatPasswordBlur}
            error={errors.repeatPassword === errorTypes.PASSWORDS_DO_NOT_MATCH &&
              'Passwords do not match.'}
          />

          <div className={styles.formInput}>
            <input
              onChange={this.handleRememberMeChange}
              type="checkbox"
              value={remember}
            /> <label>Remember me</label>
          </div>

          <Button btnStyle="primary" disabled={pending}>
            Register
          </Button>

          <p>
            Already registered? <a href="" onClick={this.openLoginModal}>Log in</a>
          </p>
        </form>
      </section>
    );
  }
}

RegisterUserForm.propTypes = {
  formState: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  sessionUserId: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    formState: get(state, ['forms', 'registerUser']),
    sessionUserId: get(state, ['session', 'userId']),
  }),
  dispatch => bindActionCreators({ ...actions, ...modalActions }, dispatch),
)(RegisterUserForm);
