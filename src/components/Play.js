import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { map, isEmpty, size } from 'lodash/fp';
import HorizontalPlayerList from 'components/common/HorizontalPlayerList';

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
    const gameCount = size(games);

    return (
      <article className={styles.play}>
        <header>
          <h1>Play</h1>
        </header>
        <section>
          {this.props.children || <Link to="/play/create">Create game</Link>}
        </section>
        <section>
          <h2>{`${gameCount} available game${gameCount !== 1 ? 's' : ''}`}</h2>
          <ul className={styles.availableGames}>
          {
            map(game => (
              <li key={game.id} className={styles.listItem}>
                <div className={styles.listItemHead}>
                  <HorizontalPlayerList users={game.users} />
                  <Link to={`/game/${game.id}`}>Open</Link>
                </div>
                {
                  game.comment && !isEmpty(game.comment) &&
                    <div className={styles.comment}>
                      <em>{game.comment}</em>
                    </div>
                }
              </li>
            ), games)
          }
          </ul>
        </section>
      </article>
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
      users: PropTypes.array.isRequired,
    })
  ).isRequired,
};
