import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App.js';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import allReducers from './reducers';

const store = createStore(
  allReducers,
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

