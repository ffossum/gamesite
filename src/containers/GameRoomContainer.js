import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import gameRoomActions from 'actions/gameRoom';
import gameChatActions from 'actions/gameChat';
import GameRoom from 'components/gameRoom/GameRoom';

class GameRoomContainer extends React.Component {
  componentDidMount() {
    const { game, gameId } = this.props;
    if (game === undefined) {
      this.props.getGameData(gameId);
    }
  }
  render() {
    let { game } = this.props;
    if (this.props.notFound) {
      return <div>Game not found</div>;
    } else if (game === undefined) {
      return <div>Fetching game data...</div>;
    }

    const { userData } = this.props;
    game = game.update('users', users => (
      users.map(userId => userData.get(userId) || { id: userId })
    ));
    game = game.update('messages', messages => (
      messages.map(message => (
        message
          .update('user', userId => userData.get(userId) || { id: userId })
          .update('args', args => (
            args && args.map(arg => {
              const userId = arg.get('user');
              return userData.getIn([userId, 'username']);
            })
          ))
      ))
    ));

    const props = {
      ...this.props,
      user: this.props.user && this.props.user.toJS(),
      game: game.toJS(),
    };

    return <GameRoom {...props} />;
  }
}

GameRoomContainer.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.object.isRequired,
  game: PropTypes.object,
  gameId: PropTypes.string.isRequired,
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  enterRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendGameMessage: PropTypes.func.isRequired,
  getGameData: PropTypes.func.isRequired,
  notFound: PropTypes.bool,
};

const actions = {
  ...gameRoomActions,
  ...gameChatActions,
};

export default connect(
  (state, ownProps) => {
    const sessionUserId = state.getIn(['session', 'userId']);
    const gameId = ownProps.params.id;
    const game = state.getIn(['data', 'games', gameId]);
    return {
      user: state.getIn(['data', 'users', sessionUserId]),
      userData: state.getIn(['data', 'users']),
      gameId,
      game,
      notFound: game === null,
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(GameRoomContainer);
