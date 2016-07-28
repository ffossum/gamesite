import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/game';
import {
  get,
  mapValues,
} from 'lodash';
import RockPaperScissors from '../components/RockPaperScissors';

class RpsContainer extends React.Component {
  render() {
    const {
      user,
      sendMessage,
      userData,
      performAction,
    } = this.props;

    let game = this.props.game;
    let players = get(game, ['state', 'players']);
    players = mapValues(players, (player, playerId) => {
      const data = userData[playerId];
      return data ? { ...player, ...data } : player;
    });

    game = {
      ...game,
      state: {
        ...game.state,
        players,
      },
    };

    return (
      <RockPaperScissors
        user={user}
        game={game}
        sendMessage={sendMessage}
        performAction={performAction}
      />
    );
  }
}

RpsContainer.propTypes = {
  user: PropTypes.object,
  game: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  performAction: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    userData: get(state, ['data', 'users']),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(RpsContainer);
