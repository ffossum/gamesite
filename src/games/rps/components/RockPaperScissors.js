import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import Spinner from 'components/common/Spinner';
import _ from 'lodash';
import Hand from './hands/Hand';
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
    const lastHandIndex = _.max(_.map(state.players, player => _.size(player.history))) - 1;

    return (
      <article className={styles.rps}>
        <section className={styles.history}>
          <HandHistory players={playersArray} />
        </section>
        <section className={styles.game}>
          <div className={styles.players}>
            {
              _.map(playersArray, (player, index) => (
                <div className={styles.player} key={player.id}>
                  <div className={styles.playerInfo}>
                    <div>
                      <Gravatar emailHash={player.emailHash} name={player.username} inline />
                      {' '}
                      {player.username}
                    </div>
                    {_.includes(state.active, player.id) && <div><Spinner /></div>}
                  </div>
                  <div className={styles.action}>
                    {
                      player.history[lastHandIndex] &&
                        <Hand
                          type={player.history[lastHandIndex]}
                          direction={index === 0 ? 'right' : 'left'}
                        />
                    }
                  </div>
                </div>
              ))
            }
          </div>
          {inGame && <ActionButtons user={user} game={game} performAction={performAction} />}
        </section>
        <section className={styles.chat}>
          <Chat messages={messages} sendMessage={sendMessage} readOnly={!inGame} />
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
