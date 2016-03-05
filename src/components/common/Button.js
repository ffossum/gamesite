import React from 'react';

import styles from './button.css';

export default class Button extends React.Component {
  render() {
    return (
      <button {...this.props} className={styles.btn}>
        {this.props.children}
      </button>
    );
  }
}
