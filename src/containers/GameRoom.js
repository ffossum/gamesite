import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/gamesList';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import _ from 'lodash';

import styles from './gameRoom.css';

class GameRoom extends React.Component {
  render() {
    const sendMessage = () => {}; // TODO

    const { game } = this.props;
    const { messages, users } = game;

    return (
      <div>
        <h1>Game room</h1>
        <ul className={styles.playerList}>
          {
            _.map(users, user => (
              <li key={user.id}>
                <Gravatar emailHash={user.emailHash} />
                {user.username}
              </li>
            ))
          }
        </ul>
        <Chat messages={messages} sendMessage={sendMessage} />
      </div>
    );
  }
}

GameRoom.propTypes = {
  user: PropTypes.object,
  game: PropTypes.object,
};

class Wrapper extends React.Component {
  render() {
    let { game } = this.props;
    if (!game) {
      return null; // TODO show spinner
    }

    const { userData } = this.props;
    game = this.props.game.update('users', users => (
      users.map(userId => userData.get(userId) || {})
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
