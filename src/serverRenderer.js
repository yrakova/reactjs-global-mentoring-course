import React from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store/store';

function renderHTML(html, preloadedState) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset=utf-8>
      <title>React Server Side Rendering</title>
      <link href="/css/main.css" rel="stylesheet" type="text/css">      
    </head>
    <body>           
      <div id="app-root">${html}</div>
      <div id="modal-root"></div>
      <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}
          </script>
      <script src="/js/main.js"></script>
    </body>
  </html>
`;
}

export default function serverRenderer() {
  return (req, res) => {
    const store = configureStore();
    const renderRoot = () => (
      <App store={store} location={req.url} Router={StaticRouter} />
    );
    const context = {};

    const htmlString = renderToString(renderRoot());
    const preloadedState = store.getState();

    res.send(renderHTML(htmlString, preloadedState));
  };
}
