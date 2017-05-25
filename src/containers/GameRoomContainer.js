/* @flow */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import gameRoomActions from 'actions/gameRoomActions';
import gameChatActions from 'actions/gameChatActions';
import GameRoom from 'components/gameRoom/GameRoom';
import {
  CANCELED,
} from 'constants/gameStatus';

import { gameRoomSelector } from 'selectors';

type Props = {
  match: {
    params: { id: string },
  },
  user: Object,
  game: Object,
  joinGame: Function,
  leaveGame: Function,
  enterRoom: Function,
  leaveRoom: Function,
  sendGameMessage: Function,
}
class GameRoomContainer extends React.Component {
  props: Props;
  componentDidMount() {
    this.props.enterRoom(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const previousGameId = this.props.match.params.id;
    const newGameId = nextProps.match.params.id;

    if (previousGameId !== newGameId) {
      this.props.leaveRoom(previousGameId);
      this.props.enterRoom(newGameId);
    }
  }
  componentWillUnmount() {
    this.props.leaveRoom(this.props.match.params.id);
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

const actions = {
  ...gameRoomActions,
  ...gameChatActions,
};

export default connect(
  gameRoomSelector,
  (dispatch: Dispatch<*>) => bindActionCreators(actions, dispatch)
)(GameRoomContainer);
