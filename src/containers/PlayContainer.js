import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/gamesList';

import Play from 'components/Play';

class PlayContainer extends React.Component {
  render() {
    const { userData, gameData, joinLobby, leaveLobby, children } = this.props;

    const games = this.props.games.map(gameId => (
      gameData.get(gameId).update('users', users => (
        users.map(userId => userData.get(userId) || { id: userId })
      ))
    ));

    const props = {
      joinLobby,
      leaveLobby,
      children,
      user: this.props.user && this.props.user.toJS(),
      games: games.toJS(),
    };

    return <Play {...props} />;
  }
}

PlayContainer.propTypes = {
  children: PropTypes.node,
  joinLobby: PropTypes.func.isRequired,
  leaveLobby: PropTypes.func.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object.isRequired,
  gameData: PropTypes.object.isRequired,
  games: PropTypes.object.isRequired,
};

export default connect(
  state => {
    const sessionUserId = state.getIn(['session', 'userId']);

    return {
      user: state.getIn(['data', 'users', sessionUserId]),
      userData: state.getIn(['data', 'users']),
      gameData: state.getIn(['data', 'games']),
      games: state.getIn(['games', 'notStarted']),
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(PlayContainer);
