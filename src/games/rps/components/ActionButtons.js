import React, { PropTypes } from 'react';
import Rock from './hands/Rock';
import Paper from './hands/Paper';
import Scissors from './hands/Scissors';
import {
  ROCK, PAPER, SCISSORS,
} from '../constants';

import styles from './actionButtons.css';

export default class ActionButtons extends React.Component {
  constructor(props) {
    super(props);

    this.handleRockClick = this.handleClick.bind(this, ROCK);
    this.handlePaperClick = this.handleClick.bind(this, PAPER);
    this.handleScissorsClick = this.handleClick.bind(this, SCISSORS);
  }
  handleClick(hand, e) {
    e.preventDefault();
    const { game, performAction } = this.props;
    performAction(game.id, hand);
  }
  render() {
    return (
      <div className={styles.group}>
        <button className={styles.btn} onClick={this.handleRockClick}>
          <Rock />
        </button>

        <button className={styles.btn} onClick={this.handlePaperClick}>
          <Paper />
        </button>

        <button className={styles.btn} onClick={this.handleScissorsClick}>
          <Scissors />
        </button>
      </div>
    );
  }
}

ActionButtons.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  performAction: PropTypes.func.isRequired,
};
