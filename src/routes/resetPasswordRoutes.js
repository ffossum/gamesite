import React from 'react';
import { Route } from 'react-router';
import ResetPasswordForm from 'containers/forms/ResetPasswordForm';

import styles from 'client/client.css';

class Container extends React.PureComponent {
  render() {
    return (
      <main className={styles.content}>
        {this.props.children}
      </main>
    );
  }
}

export default (
  <Route path="/" component={Container}>
    <Route path="reset" component={ResetPasswordForm} />
  </Route>
);
