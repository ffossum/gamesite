import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/game';
import Immutable from 'immutable';
import RockPaperScissors from '../components/RockPaperScissors';

class RpsContainer extends React.Component {
  render() {
    const {
      user,
      sendMessage,
      userData,
      performAction,
    } = this.props;

    let game = Immutable.fromJS(this.props.game);
    game = game.updateIn(['state', 'players'], players => (
      players.map((player, userId) => {
        const data = userData.get(userId);
        return data ? data.merge(player) : player;
      })
    ));

    game = game.toJS();

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
    userData: state.getIn(['data', 'users']),
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(RpsContainer);
