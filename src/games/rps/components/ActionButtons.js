import React from 'react';
import Rock from './hands/Rock';
import Paper from './hands/Paper';
import Scissors from './hands/Scissors';

import styles from './actionButtons.css';

export default class ActionsButtons extends React.Component {
  render() {
    return (
      <div className={styles.group}>
        <button className={styles.btn}><Rock /></button>
        <button className={styles.btn}><Paper /></button>
        <button className={styles.btn}><Scissors /></button>
      </div>
    );
  }
}
