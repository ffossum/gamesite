import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import Button from 'components/common/Button';
import { map, includes, size } from 'lodash';
import {
  NOT_STARTED,
} from 'constants/gameStatus';
import GameInProgress from './GameInProgress';
import isUserInGame from 'util/isUserInGame';
import gameInfo from 'games/rps/info';

import styles from './gameRoom.css';

export default class GameRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleJoinClicked = (...args) => this.props.joinGame(this.props.game.id, ...args);
    this.handleLeaveClicked = (...args) => this.props.leaveGame(this.props.game.id, ...args);
    this.handleStartClicked = (...args) => this.props.startGame(this.props.game.id, ...args);
    this.sendGameMessage = (...args) => this.props.sendGameMessage(this.props.game.id, ...args);
  }
  render() {
    const { game, user } = this.props;
    const { messages, users } = game;

    const hasStarted = game.status !== NOT_STARTED;
    const inGame = isUserInGame(game, user);
    if (hasStarted) {
      return (
        <GameInProgress
          user={user}
          game={game}
          messages={messages}
          sendGameMessage={this.sendGameMessage}
        />
      );
    }

    const currentPlayerCount = size(game.users);
    const validPlayerCount = includes(gameInfo.playerCount, currentPlayerCount) &&
      currentPlayerCount >= game.playerCount.required &&
      currentPlayerCount <= game.playerCount.required + game.playerCount.optional;

    return (
      <div className={styles.gameRoom}>
        <h1>Game room</h1>
        <div>
          {!inGame && user &&
            <Button onClick={this.handleJoinClicked}>Join game</Button>}

          {inGame && game.host !== user.id && game.status === NOT_STARTED &&
            <Button onClick={this.handleLeaveClicked}>Leave game</Button>}

          {inGame && game.host === user.id && game.status === NOT_STARTED &&
            <Button
              btnStyle="primary"
              onClick={this.handleStartClicked}
              disabled={!validPlayerCount}
            >Start game</Button>}
        </div>
        <ul className={styles.playerList}>
          {
            map(users, gameUser => (
              <li key={gameUser.id}>
                <Gravatar inline emailHash={gameUser.emailHash} name={gameUser.username} />
                {gameUser.username}
              </li>
            ))
          }
        </ul>
        <Chat messages={messages} sendMessage={this.sendGameMessage} readOnly={!inGame} />
      </div>
    );
  }
}

GameRoom.propTypes = {
  user: PropTypes.object,
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        emailHash: PropTypes.string,
        username: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  enterRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  sendGameMessage: PropTypes.func.isRequired,
};
