import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import _ from 'lodash';
import HandHistory from './HandHistory';
import ActionButtons from './ActionButtons';
import isUserInGame from 'util/isUserInGame';

import styles from './rockPaperScissors.css';

export default class RockPaperScissors extends React.Component {
  render() {
    const { user, game, sendMessage, performAction } = this.props;
    const { state, messages } = game;
    const inGame = isUserInGame(game, user);

    const playersArray = _.toArray(state.players);

    return (
      <article className={styles.rpsContainer}>
        <section className={styles.playerSection}>
            {
              _.map(playersArray, player => (
                <div key={player.id} className={styles.player}>
                  <div className={styles.playerInfo}>
                    <div>
                      <Gravatar
                        inline
                        emailHash={player.emailHash}
                        name={player.username}
                        active={_.includes(state.active, player.id)}
                      />
                      {' '}
                      <div className={styles.playerName}>{player.username}</div>
                    </div>
                  </div>
                </div>
              ))
            }
        </section>
        <section className={styles.historySection}>
          <HandHistory players={playersArray} />
        </section>
        {
          inGame && (
            <section className={styles.actionSection}>
              <ActionButtons user={user} game={game} performAction={performAction} />
            </section>
          )
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
      firstTo: PropTypes.number.isRequired,
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
