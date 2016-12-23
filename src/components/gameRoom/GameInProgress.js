import React, { PropTypes } from 'react';

import styles from './gameRoom.css';
import { Game as RockPaperScissors } from 'games/rps';

export default class GameInProgress extends React.Component {
  render() {
    const { game, user, sendGameMessage } = this.props;

    return (
      <div className={styles.inProgress}>
        <div className={styles.gameWrapper}>
          <RockPaperScissors user={user} game={game} sendMessage={sendGameMessage} />
        </div>
      </div>
    );
  }
}

GameInProgress.propTypes = {
  user: PropTypes.object,
  game: PropTypes.object.isRequired,
  sendGameMessage: PropTypes.func.isRequired,
};
