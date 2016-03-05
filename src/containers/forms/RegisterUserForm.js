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
      username: props.formState.username,
      password: props.formState.password,
      repeatPassword: props.formState.repeatPassword
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleChange.bind(this, 'username');
    this.handleUsernameBlur = this.handleBlur.bind(this, 'username');
    this.handlePasswordChange = this.handleChange.bind(this, 'password');
    this.handlePasswordBlur = this.handleBlur.bind(this, 'password');
    this.handleRepeatPasswordChange = this.handleChange.bind(this, 'repeatPassword');
    this.handleRepeatPasswordBlur = this.handleBlur.bind(this, 'repeatPassword');
  }
  componentWillReceiveProps(nextProps) {
    const {username, password, repeatPassword} = nextProps.formState;
    this.setState({
      username,
      password,
      repeatPassword
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const {registerUser, formState} = this.props;
    if (!formState.pending) {
      const {username, password, repeatPassword} = this.state;
      registerUser(username, password, repeatPassword);
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
    const {username, password, repeatPassword} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>

        <TextInput
          label="Username"
          required
          disabled={pending}
          value={username}
          onChange={this.handleUsernameChange}
          onBlur={this.handleUsernameBlur}
          autoFocus/>

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
          <Button disabled={pending}>
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
