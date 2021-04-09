import React from 'react';
import {
  Route, BrowserRouter, Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/Page404';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route>
        <Page404 />
      </Route>
    </Switch>
  </BrowserRouter>
);
