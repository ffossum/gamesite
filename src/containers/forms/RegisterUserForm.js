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
    if (!formState.pending) {
      const { email, username, password, repeatPassword } = this.state;
      registerUser(email, username, password, repeatPassword);
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
    return (
      <section>
        <h2>Registration</h2>
        <form onSubmit={this.handleSubmit} className={styles.form}>

          <div className={styles.formInput}>
            <TextInput
              label="Email"
              type="email"
              required
              disabled={pending}
              value={email}
              onChange={this.handleEmailChange}
              onBlur={this.handleEmailBlur}
              autoFocus
            />

            {errors.email === errorTypes.EMAIL_TAKEN &&
              <span>A user with this email already exists.</span>}

            {errors.email === errorTypes.INVALID_EMAIL &&
              <span>Invalid email</span>}
          </div>

          <div className={styles.formInput}>
            <TextInput
              label="Username"
              required
              disabled={pending}
              value={username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleUsernameBlur}
            />

            {errors.username === errorTypes.USERNAME_TAKEN &&
              <span>Username is already taken.</span>}
          </div>

          <div className={styles.formInput}>
            <TextInput
              label="Password"
              type="password"
              required
              disabled={pending}
              value={password}
              onChange={this.handlePasswordChange}
              onBlur={this.handlePasswordBlur}
            />
          </div>
          <div className={styles.formInput}>
            <TextInput
              label="Repeat password"
              type="password"
              required
              disabled={pending}
              value={repeatPassword}
              onChange={this.handleRepeatPasswordChange}
              onBlur={this.handleRepeatPasswordBlur}
            />

            {errors.repeatPassword === errorTypes.PASSWORDS_DO_NOT_MATCH &&
              <span>Passwords do not match.</span>}
          </div>

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
