import React from 'react';

import styles from './about.css';

export default class About extends React.PureComponent {
  render() {
    return (
      <section className={styles.about}>
        <header>
          <h1>About</h1>
        </header>
        <p>
          This site is a work in progress
          and rock-paper-scissors is meant to be replaced by something more interesting.
        </p>
        <p>
          Created by Fredrik Fossum.
        </p>
        <p>
          Code is open source and available at <a href="https://github.com/ffossum/gamesite">GitHub</a>.
        </p>
      </section>
    );
  }
}
