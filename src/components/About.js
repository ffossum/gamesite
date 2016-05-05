import React from 'react';

import styles from './about.css';

export default class About extends React.Component {
  render() {
    return (
      <section className={styles.about}>
        <header>
          <h1>About</h1>
        </header>
      </section>
    );
  }
}
