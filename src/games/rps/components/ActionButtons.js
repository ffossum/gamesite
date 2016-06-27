import React, { PropTypes } from 'react';
import Hand from './hands/Hand';
import {
  ROCK, PAPER, SCISSORS,
} from '../constants';
import _ from 'lodash';

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
    const { user, game } = this.props;
    const active = _.includes(game.state.active, user.id) && !game.waitingForServer;

    return (
      <div className={styles.group}>
        <button disabled={!active} className={styles.btn} onClick={this.handleRockClick}>
          <Hand type={ROCK} />
        </button>

        <button disabled={!active} className={styles.btn} onClick={this.handlePaperClick}>
          <Hand type={PAPER} />
        </button>

        <button disabled={!active} className={styles.btn} onClick={this.handleScissorsClick}>
          <Hand type={SCISSORS} />
        </button>
      </div>
    );
  }
}

ActionButtons.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  performAction: PropTypes.func.isRequired,
};
