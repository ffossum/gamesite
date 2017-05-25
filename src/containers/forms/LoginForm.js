/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/loginActions';
import modalActions from 'actions/modalActions';
import { REGISTER_MODAL, REQUEST_PASSWORD_RESET_MODAL } from 'constants/modalType';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import { get } from 'lodash/fp';
import { uniqueId } from 'util/uniqueId';

import styles from './form.css';

class LoginForm extends React.Component {
  state: {
    username: string,
    password: string,
  }
  constructor(props) {
    super(props);
    this.state = {
      username: props.formState.username,
      password: props.formState.password,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { username, password } = nextProps.formState;
    this.setState({
      username,
      password,
    });
  }
  handleSubmit = this.handleSubmit.bind(this);
  handleUsernameChange = this.handleChange.bind(this, 'username');
  handleUsernameBlur = this.handleBlur.bind(this, 'username');
  handlePasswordChange = this.handleChange.bind(this, 'password');
  handlePasswordBlur = this.handleBlur.bind(this, 'password');
  handleRememberMeChange = this.handleCheckboxChange.bind(this, 'remember');
  handleRegisterClicked = this.handleModalLinkClicked.bind(this, REGISTER_MODAL);
  handleResetClicked = this.handleModalLinkClicked.bind(this, REQUEST_PASSWORD_RESET_MODAL);
  handleSubmit(e) {
    e.preventDefault();
    const { logIn, formState } = this.props;
    const { remember, pending } = formState;
    if (!pending) {
      const { username, password } = this.state;
      logIn({ username, password, remember });
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
  handleModalLinkClicked(modalType, e) {
    e.preventDefault();
    this.props.openModal(modalType);
  }
  render() {
    if (this.props.sessionUserId) {
      return null;
    }
    const { error, pending, remember } = this.props.formState;
    const { username, password } = this.state;
    const checkboxId = uniqueId('remember');

    return (
      <section className={styles.modalForm}>
        <h2>Log in</h2>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <TextInput
            label="Username"
            required
            value={username}
            onChange={this.handleUsernameChange}
            onBlur={this.handleUsernameBlur}
            autoFocus
          />
          <TextInput
            label="Password"
            type="password"
            required
            value={password}
            onChange={this.handlePasswordChange}
            onBlur={this.handlePasswordBlur}
            error={error && 'Incorrect username and/or password'}
          />
          <div className={styles.formInput}>
            <input
              id={checkboxId}
              onChange={this.handleRememberMeChange}
              type="checkbox"
              value={remember}
            /> <label htmlFor={checkboxId}>Remember me</label>
          </div>

          <Button btnStyle="primary" disabled={pending}>
            Log in
          </Button>
          <p>
            Not yet registered? <a href="" onClick={this.handleRegisterClicked}>Register</a>
          </p>
          <p>
            Forgot your password? <a href="" onClick={this.handleResetClicked}>Reset</a>
          </p>
        </form>
      </section>
    );
  }
}

LoginForm.propTypes = {
  formState: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  sessionUserId: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    formState: get(['forms', 'login'], state),
    sessionUserId: get(['session', 'userId'], state),
  }),
  (dispatch: Dispatch<*>) => bindActionCreators({ ...actions, ...modalActions }, dispatch),
)(LoginForm);
