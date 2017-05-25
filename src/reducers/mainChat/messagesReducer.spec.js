// @flow
/* eslint-env jest */
import reducer from './messagesReducer';
import {
  newMessage,
  resetMessages,
} from 'actions/mainChatActions';

describe('main chat messages reducer', () => {
  test('inits as empty list', () => {
    const initialState = reducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual([]);
  });
  test('appends new message to the list', () => {
    const initialState = [{ user: '1', time: '2017-01-22T18:34:51.380Z', text: 'existing message' }];
    const state = reducer(initialState, newMessage({ user: { id: '2' }, text: 'hi' }));
    expect(state).toHaveLength(2);
    expect(state[1].user).toBe('2');
    expect(state[1].text).toBe('hi');
  });
  test('resets the entire message list', () => {
    const initialState = [{ user: '1', time: '2017-01-22T18:34:51.380Z', text: 'existing message' }];
    const action = resetMessages([{ user: '2', time: '2017-01-22T18:35:19.511Z', text: 'new message' }]);
    const state = reducer(initialState, action);
    expect(state).toEqual(
      [{ user: '2', time: '2017-01-22T18:35:19.511Z', text: 'new message' }]
    );
  });
  test('returns same state for other actions', () => {
    const initialState = [{ user: '1', time: '2017-01-22T18:34:51.380Z', text: 'existing message' }];
    const state = reducer(initialState, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
