import { createStore, combineReducers } from 'redux';

import {
  repositories,
  metrics
} from '../reducers';

let store = createStore(combineReducers({
  repositories,
  metrics
}));

export default store;