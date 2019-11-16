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
  Plot,
  Analysis
} from './pages';

import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/repository" exact component={Repository} />
        <Route path="/repository/plots" exact component={Plot} />
        <Route path="/repository/analysis" exact component={Analysis} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

