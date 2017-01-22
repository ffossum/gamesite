// @flow
import configureStore from './configureStore';

import type { Store as ReduxStore } from 'redux';
import type { State } from 'reducers';
import type { Action } from 'actions/types';
export type Store = ReduxStore<State, Action>;

export default configureStore(window.INITIAL_STATE);
