import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(reduxThunk));

const el = document.getElementById('root');
const root = ReactDOMClient.createRoot(el);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
