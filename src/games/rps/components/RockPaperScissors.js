import PropTypes from 'prop-types';
import React from 'react';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import { includes, map, maxBy, toArray } from 'lodash/fp';
import HandHistory from './HandHistory';
import ActionButtons from './ActionButtons';
import isUserInGame from 'util/isUserInGame';
import { ENDED } from 'constants/gameStatus';

import styles from './rockPaperScissors.css';

export default class RockPaperScissors extends React.Component {
  render() {
    const { user, game, sendMessage, performAction } = this.props;
    const { state, messages } = game;
    const inGame = isUserInGame(game, user);

    const isGameOver = game.status === ENDED;

    const playersArray = toArray(state.players);
    const winner = maxBy(player => player.score, playersArray);

    return (
      <article className={styles.rpsContainer}>
        <section className={styles.historySection}>
          <HandHistory players={playersArray} />
        </section>
        <section className={styles.playerSection}>
            {
              map(player => (
                <div key={player.id} className={styles.player}>
                  <div className={styles.playerInfo}>
                    <div>
                      <Gravatar
                        inline
                        emailHash={player.emailHash}
                        name={player.username}
                        active={includes(player.id, state.active)}
                      />
                      {' '}
                      <div className={styles.playerName}>{player.username}</div>
                    </div>
                  </div>
                </div>
              ), playersArray)
            }
        </section>
        {
          inGame && !isGameOver && (
            <section className={styles.actionSection}>
              <ActionButtons user={user} game={game} performAction={performAction} />
            </section>
          )
        }
        {
          isGameOver && winner.username &&
            <section className={styles.winnerSection}>
              <h1>{`${winner.username} wins!`}</h1>
            </section>
        }

        <section className={styles.chatSection}>
          <div>
            <Chat messages={messages} sendMessage={sendMessage} readOnly={!inGame} />
          </div>
        </section>
      </article>
    );
  }
}

RockPaperScissors.propTypes = {
  user: PropTypes.object,
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    state: PropTypes.shape({
      active: PropTypes.arrayOf(PropTypes.string).isRequired,
      players: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        emailHash: PropTypes.string,
        username: PropTypes.string,
        score: PropTypes.number.isRequired,
        history: PropTypes.array.isRequired,
      })).isRequired,
    }),
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        emailHash: PropTypes.string,
        username: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  sendMessage: PropTypes.func.isRequired,
  performAction: PropTypes.func.isRequired,
};
