import React from 'react';
import {uniqueId} from 'util/uniqueId';

import styles from './textInput.css';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputId = uniqueId('text');
  }
  render() {
    const {label, ...otherProps} = this.props;
    otherProps.type = otherProps.type || 'text';

    return (
      <div className={styles.input}>
        {label && <label htmlFor={this.inputId}>{label}</label>}
        <input id={this.inputId} {...otherProps} />
      </div>
    );
  }
}
