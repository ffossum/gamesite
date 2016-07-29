import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/login';
import modalActions from 'actions/modal';
import { REGISTER_MODAL } from 'constants/modalType';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import { get } from 'lodash';

import styles from './form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.formState.username,
      password: props.formState.password,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleChange.bind(this, 'username');
    this.handleUsernameBlur = this.handleBlur.bind(this, 'username');
    this.handlePasswordChange = this.handleChange.bind(this, 'password');
    this.handlePasswordBlur = this.handleBlur.bind(this, 'password');
    this.handleRememberMeChange = this.handleCheckboxChange.bind(this, 'remember');
    this.openRegisterModal = this.openRegisterModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { username, password } = nextProps.formState;
    this.setState({
      username,
      password,
    });
  }
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
  openRegisterModal(e) {
    e.preventDefault();
    this.props.openModal(REGISTER_MODAL);
  }
  render() {
    if (this.props.sessionUserId) {
      return null;
    }
    const { error, pending, remember } = this.props.formState;
    const { username, password } = this.state;
    return (
      <section>
        <h2>Log in</h2>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.formInput}>
            <TextInput
              label="Username"
              required
              value={username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleUsernameBlur}
              autoFocus
            />
          </div>
          <div className={styles.formInput}>
            <TextInput
              label="Password"
              type="password"
              required
              value={password}
              onChange={this.handlePasswordChange}
              onBlur={this.handlePasswordBlur}
            />
            {error && <div>Incorrect username and/or password</div>}
          </div>
          <div className={styles.formInput}>
            <input
              onChange={this.handleRememberMeChange}
              type="checkbox"
              value={remember}
            /> <label>Remember me</label>
          </div>

          <Button btnStyle="primary" disabled={pending}>
            Log in
          </Button>
          <p>
            Not yet registered? <a href="" onClick={this.openRegisterModal}>Register</a>
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
    formState: get(state, ['forms', 'login']),
    sessionUserId: get(state, ['session', 'userId']),
  }),
  dispatch => bindActionCreators({ ...actions, ...modalActions }, dispatch),
)(LoginForm);
