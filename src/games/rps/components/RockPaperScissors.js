import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import Spinner from 'components/common/Spinner';
import _ from 'lodash';
import Scissors from './hands/Scissors';
import ActionButtons from './ActionButtons';

import styles from './rockPaperScissors.css';

export default class RockPaperScissors extends React.Component {
  render() {
    const { user, game, sendMessage, performAction } = this.props;
    const { state, users, messages } = game;
    const inGame = user && _.some(users, gameUser => gameUser.id === user.id);

    return (
      <article className={styles.rps}>
        <section className={styles.game}>
          <div className={styles.players}>
            {
              _.map(_.toArray(state.players), (player, index) => (
                <div className={styles.player} key={player.id}>
                  <div className={styles.playerInfo}>
                    <div><Gravatar emailHash={player.emailHash} inline /> {player.username}</div>
                    {_.includes(state.active, player.id) && <div><Spinner /></div>}
                  </div>
                  <div className={styles.action}>
                    <Scissors direction={index === 0 ? 'right' : 'left'} />
                  </div>
                </div>
              ))
            }
          </div>
          <ActionButtons game={game} performAction={performAction} />
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
