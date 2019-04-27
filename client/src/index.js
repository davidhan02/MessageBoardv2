import './styles/App.scss';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './utils/store';
import { FETCH_USER } from './actions/types';

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.querySelector('#root'));
    hasRendered = true;
  }
};

axios.get('/api/users/current_user').then(res => {
  store.dispatch({ type: FETCH_USER, payload: res.data });
  renderApp();
});
