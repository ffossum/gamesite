import React, { PropTypes } from 'react';
import Chat from 'components/chat/Chat';
import _ from 'lodash';

export default class RockPaperScissors extends React.Component {
  render() {
    const { user, game, sendMessage } = this.props;
    const { state, users, messages } = game;
    const inGame = user && _.some(users, gameUser => gameUser.id === user.id);

    return (
      <div>
        {
          _.map(state.players, player => (
            <div key={player.id}>
              {JSON.stringify(player)}
            </div>
          ))
        }
        <Chat messages={messages} sendMessage={sendMessage} readOnly={!inGame} />
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
