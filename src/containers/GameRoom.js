import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/gameRoom';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import Button from 'components/common/Button';
import _ from 'lodash';

import styles from './gameRoom.css';

class GameRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleJoinClicked = this.handleJoinClicked.bind(this, props.game.id);
  }
  handleJoinClicked(gameId) {
    this.props.joinGame(gameId);
  }
  render() {
    const sendMessage = () => {}; // TODO

    const { game, user } = this.props;
    const { messages, users } = game;

    const inGame = user && _.some(users, gameUser => gameUser.id === user.id);

    return (
      <div>
        <h1>Game room</h1>
        {!inGame && user && <Button onClick={this.handleJoinClicked}>Join game</Button>}
        <ul className={styles.playerList}>
          {
            _.map(users, gameUser => (
              <li key={gameUser.id}>
                <Gravatar emailHash={gameUser.emailHash} />
                {gameUser.username}
              </li>
            ))
          }
        </ul>
        <Chat messages={messages} sendMessage={sendMessage} readOnly={!inGame} />
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
};

class Wrapper extends React.Component {
  render() {
    let { game } = this.props;
    if (!game) {
      return null; // TODO show spinner
    }

    const { userData } = this.props;
    game = this.props.game.update('users', users => (
      users.map(userId => userData.get(userId) || { id: userId })
    ));

    const props = {
      ...this.props,
      user: this.props.user && this.props.user.toJS(),
      game: game.toJS(),
    };

    return <GameRoom {...props} />;
  }
}

Wrapper.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.object.isRequired,
  game: PropTypes.object,
  joinGame: PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => {
    const loggedInUser = state.get('loggedInUser');
    const gameId = ownProps.params.id;

    return {
      loggedInUser,
      user: state.getIn(['data', 'users', loggedInUser]),
      userData: state.getIn(['data', 'users']),
      game: state.getIn(['games', 'notStarted', gameId]),
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);
