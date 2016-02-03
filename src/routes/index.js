import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Main from 'components/Main';
import LoginForm from 'containers/forms/LoginForm';
import Nav from 'containers/Nav';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Main} />
    <Route path="login" component={LoginForm} />
  </Route>
);
