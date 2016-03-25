import React, { PropTypes } from 'react';
import styles from './gravatar.css';

export default class Gravatar extends React.Component {
  render() {
    const { emailHash } = this.props;

    const gravatarUrl = emailHash
      ? `http://www.gravatar.com/avatar/${emailHash}?d=retro`
      : 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y';

    return (
      <img
        className={styles.gravatar}
        src={gravatarUrl}
      />
    );
  }
}

Gravatar.propTypes = {
  emailHash: PropTypes.string,
};
