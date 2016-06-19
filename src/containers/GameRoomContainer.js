import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import gameRoomActions from 'actions/gameRoom';
import gameChatActions from 'actions/gameChat';
import GameRoom from 'components/gameRoom/GameRoom';

import { gameRoomSelector } from 'selectors';

class GameRoomContainer extends React.Component {
  componentDidMount() {
    const { game, params } = this.props;
    if (game === undefined) {
      this.props.getGameData(params.id);
    }
  }
  render() {
    const { game } = this.props;
    if (game === null) {
      return <div>Game not found</div>;
    } else if (game === undefined) {
      return <div>Fetching game data...</div>;
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
  getGameData: PropTypes.func.isRequired,
};

const actions = {
  ...gameRoomActions,
  ...gameChatActions,
};

export default connect(
  gameRoomSelector,
  dispatch => bindActionCreators(actions, dispatch)
)(GameRoomContainer);
