import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <button>Submit</button>
      </form>
    );
  }
}
