import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions, {errors as errorTypes} from 'actions/registerUser';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';

class RegisterUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.formState.email,
      username: props.formState.username,
      password: props.formState.password,
      repeatPassword: props.formState.repeatPassword
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
  }
  componentWillReceiveProps(nextProps) {
    const {email, username, password, repeatPassword} = nextProps.formState;
    this.setState({
      email,
      username,
      password,
      repeatPassword
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const {registerUser, formState} = this.props;
    if (!formState.pending) {
      const {email, username, password, repeatPassword} = this.state;
      registerUser(email, username, password, repeatPassword);
    }
  }
  handleChange(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }
  handleBlur(field, e) {
    const {formState, updateForm} = this.props;
    if (formState[field] !== e.target.value) {
      updateForm({
        [field]: e.target.value
      });
    }
  }
  render() {
    if (this.props.loggedInUser) {
      return null;
    }

    const {errors, pending} = this.props.formState;
    const {email, username, password, repeatPassword} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>

        <TextInput
         label="Email"
         type="email"
         required
         disabled={pending}
         value={email}
         onChange={this.handleEmailChange}
         onBlur={this.handleEmailBlur}
         autoFocus />

        {errors.email === errorTypes.EMAIL_TAKEN && <span>A user with this email already exists.</span>}
        {errors.email === errorTypes.INVALID_EMAIL && <span>Invalid email</span>}

        <TextInput
          label="Username"
          required
          disabled={pending}
          value={username}
          onChange={this.handleUsernameChange}
          onBlur={this.handleUsernameBlur} />

        {errors.username === errorTypes.USERNAME_TAKEN && <span>Username is already taken.</span>}

        <TextInput
          label="Password"
          type="password"
          required
          disabled={pending}
          value={password}
          onChange={this.handlePasswordChange}
          onBlur={this.handlePasswordBlur} />

        <TextInput
          label="Repeat password"
          type="password"
          required
          disabled={pending}
          value={repeatPassword}
          onChange={this.handleRepeatPasswordChange}
          onBlur={this.handleRepeatPasswordBlur} />

        {errors.repeatPassword === errorTypes.PASSWORDS_DO_NOT_MATCH && <span>Passwords do not match.</span>}

        <div>
          <Button btnStyle="primary" disabled={pending}>
            Register
          </Button>
        </div>
      </form>
    );
  }
}

RegisterUserForm.propTypes = {
  formState: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
};

export default connect(
  state => ({
    formState: state.forms.registerUser,
    loggedInUser: state.loggedInUser
  }),
  dispatch => {
    const {registerUser, updateForm} = bindActionCreators(actions, dispatch);
    return {
      registerUser,
      updateForm
    };
  }
)(RegisterUserForm);
