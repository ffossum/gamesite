import PropTypes from 'prop-types';
import React from 'react';
import TextInput from 'components/common/TextInput';
import styles from '../userSettings.css';

export default class AccountSettings extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <section className={styles.section}>
        <TextInput label="Username" value={user.username} disabled />
        <TextInput label="Email" value={user.email} />
      </section>
    );
  }
}

AccountSettings.propTypes = {
  user: PropTypes.object.isRequired,
};
