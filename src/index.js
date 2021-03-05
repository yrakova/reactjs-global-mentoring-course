import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

console.log(`This is a ${process.env.NODE_ENV} build!`);
