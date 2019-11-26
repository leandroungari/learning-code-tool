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
  Analysis,
  Stats,
  Viewer
} from './pages';

import 'antd/dist/antd.css';
import PrivateRoute from './components/router/PrivateRoute';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/repository" exact>
          <Repository />
        </PrivateRoute>
        <PrivateRoute path="/repository/plots" exact>
          <Plot />
        </PrivateRoute>
        <PrivateRoute path="/repository/stats" exact>
          <Stats />
        </PrivateRoute>
        <PrivateRoute path="/repository/analysis" exact>
          <Analysis />
        </PrivateRoute>
        <PrivateRoute path="/repository/analysis/viewer" exact>
          <Viewer />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

