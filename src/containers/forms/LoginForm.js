import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../../actions/login';
import {Field, getField} from 'react-redux-form';
import validator from 'validator';

const isRequired = (value) => !validator.isNull(value);

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {user, authenticate} = this.props;
    authenticate(user.username, user.password);
  }
  render() {
    const {user, userForm} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Field
          model="user.username"
          updateOn="blur">
          <label>Username</label>
          <input type="text" defaultValue={user.username} />
        </Field>

        <Field
          model="user.password"
          updateOn="blur">
          <label>Password</label>
          <input type="password" defaultValue={user.password} />
        </Field>

        {!userForm.valid && <div>Incorrect username/password!</div>}
        <button disabled={userForm.pending}>
          Log in
        </button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  userForm: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired
};

export default connect(
  state => ({
    user: state.forms.user,
    userForm: state.forms.userForm
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(LoginForm);
