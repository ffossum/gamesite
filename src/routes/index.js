import React from 'react';
import {IndexRoute, Route, Link} from 'react-router';

import Main from '../components/Main';
import LoginForm from '../containers/forms/LoginForm';

class Root extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/">Main</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
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
