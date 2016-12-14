import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import gameRoomActions from 'actions/gameRoom';
import gameChatActions from 'actions/gameChat';
import GameRoom from 'components/gameRoom/GameRoom';
import {
  CANCELED,
} from 'constants/gameStatus';

import { gameRoomSelector } from 'selectors';

class GameRoomContainer extends React.Component {
  componentDidMount() {
    this.props.enterRoom(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const previousGameId = this.props.params.id;
    const newGameId = nextProps.params.id;

    if (previousGameId !== newGameId) {
      this.props.leaveRoom(previousGameId);
      this.props.enterRoom(newGameId);
    }
  }
  componentWillUnmount() {
    this.props.leaveRoom(this.props.params.id);
  }
  render() {
    const { game } = this.props;
    if (game === null) {
      return <div>Game not found</div>;
    } else if (game === undefined) {
      return <div>Fetching game data...</div>;
    } else if (game.status === CANCELED) {
      return <div>Game canceled by host.</div>;
    }

    return <GameRoom {...this.props} />;
  }
}

GameRoomContainer.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object,
  game: PropTypes.object,
  joinGame: PropTypes.func.isRequired,
  leaveGame: PropTypes.func.isRequired,
  enterRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  sendGameMessage: PropTypes.func.isRequired,
};

const actions = {
  ...gameRoomActions,
  ...gameChatActions,
};

export default connect(
  gameRoomSelector,
  dispatch => bindActionCreators(actions, dispatch)
)(GameRoomContainer);
