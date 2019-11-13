import { createStore, combineReducers } from 'redux';

import {
  repositories
} from '../reducers';

let store = createStore(combineReducers({
  repositories
}));

export default store;