import PropTypes from 'prop-types';
import React from 'react';
import { uniqueId } from 'util/uniqueId';
import classnames from 'classnames';

import styles from './textInput.css';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputId = uniqueId('text');
  }
  render() {
    const { label, compact, error, ...otherProps } = this.props;
    otherProps.type = otherProps.type || 'text';

    const containerClass = classnames({
      [styles.margin]: !compact,
    });
    return (
      <div className={containerClass}>
        {label && <label className={styles.label} htmlFor={this.inputId}>{label}</label>}
        <input className={`${styles.textInput} ${styles.full}`} id={this.inputId} {...otherProps} />
        {error && <div>{error}</div>}
      </div>
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string,
  compact: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};
