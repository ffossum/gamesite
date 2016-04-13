import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions/gamesList';
import _ from 'lodash';
import Gravatar from 'components/common/Gravatar';

import styles from './play.css';

export default class Play extends React.Component {
  componentDidMount() {
    this.props.joinLobby();
  }
  componentWillUnmount() {
    this.props.leaveLobby();
  }
  render() {
    const { games } = this.props;
    const gameCount = _.size(games);

    return (
    <div>
      <h1>Play</h1>
      <section>
        { this.props.children || <Link to="/play/create">Create game</Link> }
      </section>
      <section>
        <h2>{ `${gameCount} available game${gameCount !== 1 ? 's' : ''}` }</h2>
        <ul className={styles.availableGames}>
         {
           _.map(games, game => (
             <li key={game.id}>
              <Link to={`/game/${game.id}`}>Go to</Link>
              {
                _.map(game.users, user => (
                  <span key={user.id || ''}>
                    <Gravatar inline emailHash={user.emailHash} />
                    {user.username}
                  </span>
                ))
              }
             </li>
           ))
         }
        </ul>
      </section>
    </div>
    );
  }
}

Play.propTypes = {
  children: PropTypes.node,
  joinLobby: PropTypes.func.isRequired,
  leaveLobby: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};

class Wrapper extends React.Component {
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

Wrapper.propTypes = {
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
)(Wrapper);
