import React, { PropTypes } from 'react';
import { Link } from 'react-router';
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
