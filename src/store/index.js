import { createStore, combineReducers } from 'redux';

import {
  repositories,
  metrics
} from '../reducers';

const store = createStore(
  combineReducers({
    metrics,
    repositories
  })
);

export default store;