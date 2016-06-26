/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import Button from 'components/common/Button';

import styles from './incrementer.css';
import textInputStyles from '../textInput.css';

export default class Incrementer extends React.Component {
  constructor() {
    super();
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
  }
  handlePlusClick(e) {
    e.preventDefault();
    const { value, disabled, onChange } = this.props;
    if (!disabled && onChange) {
      onChange(value + 1);
    }
  }
  handleMinusClick(e) {
    e.preventDefault();
    const { value, disabled, onChange } = this.props;
    if (!disabled && onChange) {
      onChange(value - 1);
    }
  }
  render() {
    const { value, disabled } = this.props;
    return (
      <div>
        <label>Players</label>
        <div className={styles.group}>
          <Button left disabled={disabled}>
            <Minus />
          </Button>
          <input
            readOnly
            disabled={disabled}
            className={`${textInputStyles.textInput} ${styles.input}`}
            value={value}
          />
          <Button right disabled={disabled}>
            <Plus />
          </Button>
        </div>
      </div>
    );
  }
}

Incrementer.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

const Plus = () => (
  <svg className={styles.icon} viewBox="0 0 32 32">
    <path d={'M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z'}></path>
  </svg>
);

const Minus = () => (
  <svg className={styles.icon} viewBox="0 0 32 32">
    <path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"></path>
  </svg>
);
