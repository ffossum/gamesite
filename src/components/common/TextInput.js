import React, { PropTypes } from 'react';
import { uniqueId } from 'util/uniqueId';

import styles from './textInput.css';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputId = uniqueId('text');
  }
  render() {
    const { label, ...otherProps } = this.props;
    otherProps.type = otherProps.type || 'text';

    return (
      <div>
        {label && <label htmlFor={this.inputId}>{label}</label>}
        <input className={`${styles.textInput} ${styles.full}`} id={this.inputId} {...otherProps} />
      </div>
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string,
};
