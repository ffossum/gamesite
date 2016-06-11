import React, { PropTypes } from 'react';

import styles from './gameRoom.css';

let GameComponent;
function getGameComponentAsync() {
  return new Promise((resolve) => {
    require.ensure([], require => {
      GameComponent = require('games/rps').Game;
      resolve(GameComponent);
    });
  });
}

export default class GameInProgress extends React.Component {
  componentWillMount() {
    if (!GameComponent) {
      getGameComponentAsync().then(() => {
        this.forceUpdate();
      });
    }
  }
  render() {
    const { game, user, sendGameMessage } = this.props;

    if (!GameComponent) {
      return <div>Loading game...</div>;
    }
    return (
      <div className={styles.inProgress}>
        <div className={styles.gameWrapper}>
          <GameComponent user={user} game={game} sendMessage={sendGameMessage} />
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
