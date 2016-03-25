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
                    <Gravatar emailHash={user.emailHash} />
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
  games: PropTypes.object.isRequired,
};

class Wrapper extends React.Component {
  render() {
    const { userData } = this.props;

    const games = this.props.games.map(game => (
      game.update('users', users => (
        users.map(userId => userData.get(userId) || {})
      ))
    ));

    const props = {
      ...this.props,
      user: this.props.user && this.props.user.toJS(),
      games: games.toJS(),
    };

    return <Play {...props} />;
  }
}

Wrapper.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.object.isRequired,
  games: PropTypes.object.isRequired,
};

export default connect(
  state => {
    const loggedInUser = state.get('loggedInUser');

    return {
      loggedInUser,
      user: state.getIn(['data', 'users', loggedInUser]),
      userData: state.getIn(['data', 'users']),
      games: state.getIn(['games', 'notStarted']),
    };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(Wrapper);