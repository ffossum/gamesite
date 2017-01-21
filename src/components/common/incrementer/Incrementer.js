/* eslint-disable max-len */

import React, { PropTypes } from 'react';
import Button from 'components/common/Button';
import { isNumber } from 'lodash/fp';
import styles from './incrementer.css';
import textInputStyles from '../textInput.css';
import { uniqueId } from 'util/uniqueId';

export default class Incrementer extends React.Component {
  constructor() {
    super();
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);

    this.elementId = uniqueId('incrementer');
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
    const { label, value, disabled, maxValue, minValue } = this.props;

    const disabledMinus = disabled ||
      (isNumber(minValue) && value <= minValue);

    const disabledPlus = disabled ||
      (isNumber(maxValue) && value >= maxValue);

    return (
      <div>
        {label && <label htmlFor={this.elementId} className={textInputStyles.label}>{label}</label>}
        <div id={this.elementId} className={styles.group}>
          <Button
            disabled={disabledMinus}
            left
            onClick={this.handleMinusClick}
          >
            <Minus />
          </Button>
          <input
            readOnly
            disabled={disabled}
            className={`${textInputStyles.textInput} ${styles.input}`}
            value={value}
          />
          <Button
            disabled={disabledPlus}
            right
            onClick={this.handlePlusClick}
          >
            <Plus />
          </Button>
        </div>
      </div>
    );
  }
}

Incrementer.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
};

const Plus = () => (
  <svg role="img" aria-label="Increase" className={styles.icon} viewBox="0 0 32 32">
    <path d={'M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z'}></path>
  </svg>
);

const Minus = () => (
  <svg role="img" aria-label="Decrease" className={styles.icon} viewBox="0 0 32 32">
    <path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"></path>
  </svg>
);
