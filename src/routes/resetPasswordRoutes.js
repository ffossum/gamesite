import React from 'react';
import { Route } from 'react-router-dom';
import ResetPasswordForm from 'containers/forms/ResetPasswordForm';

import styles from 'client/client.css';

export default function Routes() {
  return (
    <main className={styles.content}>
      <Route path="/reset" component={ResetPasswordForm} />
    </main>
  );
}
