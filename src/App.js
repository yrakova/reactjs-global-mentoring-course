import React from 'react';
import {
  Route, BrowserRouter, Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import MoviePage from './pages/MoviePage';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/film/:id" exact>
        <MoviePage />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  </BrowserRouter>
);
