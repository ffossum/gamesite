import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';
import Gravatar from 'components/common/Gravatar';
import Spinner from 'components/common/Spinner';
import _ from 'lodash';

import styles from './rockPaperScissors.css';

export default class RockPaperScissors extends React.Component {
  render() {
    const { user, game, sendMessage } = this.props;
    const { state, users, messages } = game;
    const inGame = user && _.some(users, gameUser => gameUser.id === user.id);

    return (
      <div className={styles.rps}>
        <div className={styles.players}>
          {
            _.map(state.players, player => (
              <div key={player.id} className={styles.player}>
                <div><Gravatar emailHash={player.emailHash} inline /> {player.username}</div>
                <div><Spinner /></div>
              </div>
            ))
          }
        </div>
        <div className={styles.chat}>
          <Chat messages={messages} sendMessage={sendMessage} readOnly={!inGame} />
        </div>
      </div>
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
