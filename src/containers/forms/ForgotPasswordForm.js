import { LOGIN_MODAL, REGISTER_MODAL } from 'constants/modalType';
import modalActions from 'actions/modal';
import forgotPasswordActions from 'actions/forgotPasswordActions';
import React, { PropTypes } from 'react';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';

import styles from './form.css';

class ForgotPasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      submittedEmail: null,
    };
    this.handleRegisterClicked = this.handleModalLinkClicked.bind(this, REGISTER_MODAL);
    this.handleLogInClicked = this.handleModalLinkClicked.bind(this, LOGIN_MODAL);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillUnmount() {
    this.props.clearForm();
  }
  handleModalLinkClicked(modalType, e) {
    e.preventDefault();
    this.props.openModal(modalType);
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    this.setState({
      submittedEmail: email,
    });
    this.props.forgotPassword(email);
  }
  render() {
    const { pending = false, success } = this.props;
    const { email } = this.state;
    const emailError = get(this.props, ['errors', 'email']);
    return (
      <section className={styles.modalForm}>
        <h2>Reset password</h2>
        {
          success ?
            <p className={styles.success}>
              <b>✔</b> An email with further instructions has been sent to
              {' '}
              <em>{this.state.submittedEmail}</em>.
            </p>
            :
            <form onSubmit={this.handleSubmit}>
              <TextInput
                label="Email"
                type="email"
                required
                disabled={pending}
                value={email}
                onChange={this.handleEmailChange}
                autoFocus
                error={emailError}
              />
              <Button btnStyle="primary" disabled={pending}>
                Reset
              </Button>
            </form>
        }
        <p>
          Remember your password? <a href="" onClick={this.handleLogInClicked}>Log in</a>
        </p>
        <p>
          Not yet registered? <a href="" onClick={this.handleRegisterClicked}>Register</a>
        </p>
      </section>
    );
  }
}

ForgotPasswordForm.propTypes = {
  openModal: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  errors: PropTypes.object,
  success: PropTypes.bool,
  clearForm: PropTypes.func.isRequired,
};

export default connect(
  state => get(state, ['forms', 'forgotPassword']),
  dispatch => bindActionCreators({ ...forgotPasswordActions, ...modalActions }, dispatch),
)(ForgotPasswordForm);
