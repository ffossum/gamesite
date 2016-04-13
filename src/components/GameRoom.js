import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import Button from 'components/common/Button';
import _ from 'lodash';

import styles from './gameRoom.css';

export default class GameRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleJoinClicked = this.props.joinGame.bind(this, props.game.id);
    this.handleLeaveClicked = this.props.leaveGame.bind(this, props.game.id);
    this.isInGame = this.isInGame.bind(this);
    this.sendGameMessage = props.sendGameMessage.bind(this, props.game.id);
  }
  componentDidMount() {
    const inGame = this.isInGame();
    if (!inGame) {
      this.props.enterRoom(this.props.game.id);
    }
  }
  componentWillUnmount() {
    const inGame = this.isInGame();
    if (!inGame) {
      this.props.leaveRoom(this.props.game.id);
    }
  }
  isInGame() {
    const { game, user } = this.props;
    const { users } = game;

    return user && _.some(users, gameUser => gameUser.id === user.id);
  }
  render() {
    const { game, user } = this.props;
    const { messages, users } = game;

    const inGame = this.isInGame();
    return (
      <div>
        <h1>Game room</h1>
        {!inGame && user && <Button onClick={this.handleJoinClicked}>Join game</Button>}
        {
          inGame && game.host !== user.id &&
            <Button onClick={this.handleLeaveClicked}>Leave game</Button>
        }
        <ul className={styles.playerList}>
          {
            _.map(users, gameUser => (
              <li key={gameUser.id}>
                <Gravatar inline emailHash={gameUser.emailHash} />
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
  sendGameMessage: PropTypes.func.isRequired,
};
