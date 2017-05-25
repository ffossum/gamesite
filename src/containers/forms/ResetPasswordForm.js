/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import actions from 'actions/resetPasswordActions';
import errorTypes from 'constants/errorType';
import queryString from 'query-string';

import styles from './form.css';

class ResetPasswordForm extends React.Component {
  state: {
    password: string,
    repeatPassword: string,
  }
  constructor() {
    super();
    this.state = {
      password: '',
      repeatPassword: '',
    };
  }
  handlePasswordChange = this.handleChange.bind(this, 'password');
  handleRepeatPasswordChange = this.handleChange.bind(this, 'repeatPassword');
  handleSubmit = this.handleSubmit.bind(this);
  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.resetPassword({
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
      userId: this.props.userId,
      token: this.props.token,
    });
  }
  render() {
    const { pending, success, userId, token, errors } = this.props;
    const { password, repeatPassword } = this.state;
    if (!userId || !token) {
      return <div>Invalid parameters</div>;
    }
    return (
      <section>
        <h2>Reset password</h2>
        {
          success ?
            <div>
              <p className={styles.success}>
                <b>
                  <span role="img" aria-label="checkmark">✔</span>
                </b>
                {' '}
                Password has been successfully reset.
              </p>
              <p>
                Return to <a href="/">main page</a>.
              </p>
            </div>
            :
            <form onSubmit={this.handleSubmit}>
              <TextInput
                label="New password"
                type="password"
                required
                disabled={pending}
                value={password}
                onChange={this.handlePasswordChange}
                autoFocus
              />
              <TextInput
                label="Repeat password"
                type="password"
                required
                disabled={pending}
                value={repeatPassword}
                onChange={this.handleRepeatPasswordChange}
                error={errors.repeatPassword === errorTypes.PASSWORDS_DO_NOT_MATCH &&
                  'Passwords do not match.'}
              />
              <Button btnStyle="primary" disabled={pending}>
                Submit
              </Button>
            </form>
        }
      </section>
    );
  }
}

ResetPasswordForm.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  userId: PropTypes.string,
  token: PropTypes.string,
  pending: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.object,
};

function getQueryParams(ownProps) {
  const { location = {} } = ownProps;
  const { id: userId, token } = queryString.parse(location.search);

  return {
    userId,
    token,
  };
}

export default connect(
  state => state,
  (dispatch: Dispatch<*>) => bindActionCreators(actions, dispatch),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...getQueryParams(ownProps),
  }),
)(ResetPasswordForm);

