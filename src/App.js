import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import MoviePage from './pages/MoviePage';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

const App = ({ store, Router, location, context }) => (
  <Provider store={store}>
    <Router location={location} context={context}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/search/:searchValue" exact>
          <Home />
        </Route>
        <Route path="/film/:id" exact>
          <MoviePage />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
