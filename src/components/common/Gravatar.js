import React, { PropTypes } from 'react';
import styles from './gravatar.css';
import classnames from 'classnames';

export default class Gravatar extends React.Component {
  render() {
    const { emailHash, inline, size = 's', name } = this.props;

    const gravatarUrl = emailHash
      ? `http://www.gravatar.com/avatar/${emailHash}?d=retro`
      : 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y';

    const className = classnames({
      [styles.gravatar]: true,
      [styles.inline]: inline,
      [styles[size]]: true,
    });

    const role = name ? undefined : 'presentation';

    return (
      <img
        alt={name}
        title={name}
        role={role}
        className={className}
        src={gravatarUrl}
      />
    );
  }
}

Gravatar.propTypes = {
  emailHash: PropTypes.string,
  name: PropTypes.string,
  inline: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm']),
};
