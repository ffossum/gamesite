/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { sendMessage, newMessage } from 'actions/mainChat';
import { getUserData } from 'actions/userData';
import { call, put, select } from 'redux-saga/effects';
import { sendMessageSaga, newMessageSaga } from './mainChatSaga';
import { userIdSelector } from 'selectors/commonSelectors';
import { expect } from 'chai';
import socket from 'client/socket';

describe('main chat saga', () => {
  it('publishes message to socket if user is logged in', () => {
    const action = sendMessage('message text');
    const generator = sendMessageSaga(action);
    expect(generator.next().value).to.deep.equal(
      select(userIdSelector)
    );

    expect(generator.next('user id').value).to.deep.equal(
      call(socket.publish, 'mainchat', [action.type, {
        user: { id: 'user id' },
        text: 'message text',
      }])
    );
  });

  it('does not publish message if user is not logged in', () => {
    const action = sendMessage('message text');
    const generator = sendMessageSaga(action);
    expect(generator.next().value).to.deep.equal(
      select(userIdSelector)
    );

    expect(generator.next(null).value).to.be.undefined;
  });

  it('dispatches action to fetch user data when it receives message', () => {
    const action = newMessage({
      user: { id: 'user id' },
      text: 'message text',
    });
    const generator = newMessageSaga(action);
    expect(generator.next().value).to.deep.equal(
      put(getUserData('user id'))
    );
  });
});
