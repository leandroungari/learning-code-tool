import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import {
  Home,
  Repository
} from './pages';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/repository/:name" component={Repository} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

