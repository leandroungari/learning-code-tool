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
  Repository,
  Plot
} from './pages';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/repository/:name" component={Repository} />
        <Route path="/plot/:name" component={Plot} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

