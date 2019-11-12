import { createStore, combineReducers } from 'redux';

import {
  repositories
} from '../reducers';

const store = createStore(
  combineReducers({
    repositories
  })
);

export default store;