import React, { PropTypes } from 'react';
import styles from './gravatar.css';

export default class Gravatar extends React.Component {
  render() {
    const { emailHash } = this.props;
    return (
      <img
        className={styles.gravatar}
        src={`http://www.gravatar.com/avatar/${emailHash}?d=retro`}
      />
    );
  }
}

Gravatar.propTypes = {
  emailHash: PropTypes.string.isRequired,
};
