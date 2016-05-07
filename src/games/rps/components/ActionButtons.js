import React, { PropTypes } from 'react';
import Hand from './hands/Hand';
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
          <Hand type={ROCK} />
        </button>

        <button className={styles.btn} onClick={this.handlePaperClick}>
          <Hand type={PAPER} />
        </button>

        <button className={styles.btn} onClick={this.handleScissorsClick}>
          <Hand type={SCISSORS} />
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
