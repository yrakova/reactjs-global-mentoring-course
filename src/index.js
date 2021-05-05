import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import configureStore from './store/store';

const app = (
  <StrictMode>    
      <App store={configureStore(window.PRELOADED_STATE)} Router={BrowserRouter} />    
  </StrictMode>
);

ReactDOM.hydrate(app, document.getElementById('app-root'));

console.log(`This is a ${process.env.NODE_ENV} build!`);
