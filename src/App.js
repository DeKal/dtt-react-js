// Import resources

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from 'redux/store';
import { LocalizeProvider } from "react-localize-redux";
import App from 'screens/index';

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// Import css
import 'assets/css/appStyles.scss';

// Render main app
ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
        <App />
    </LocalizeProvider>
  </Provider>
  , document.getElementById('app')
)
