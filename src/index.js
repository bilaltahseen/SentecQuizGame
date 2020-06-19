import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './Admin';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/analytics';
import DataProvider from './Components/DataContext';
import Score from './Score';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';

Axios.defaults.baseURL = process.env.REACT_APP_API;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route path='/scoreview' component={Score} />
      </Switch>

      {isMobile ? (
        <Route
          exact
          path='/'
          render={() => (
            <DataProvider>
              <App />
            </DataProvider>
          )}
        />
      ) : (
        ''
      )}
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
