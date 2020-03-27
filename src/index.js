import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAFe_qjhfuHZ7MlliMYjtzYhcaBrJtd7Is',
  authDomain: 'sentecquizapp.firebaseapp.com',
  databaseURL: 'https://sentecquizapp.firebaseio.com',
  projectId: 'sentecquizapp',
  storageBucket: 'sentecquizapp.appspot.com',
  messagingSenderId: '272225063024',
  appId: '1:272225063024:web:f22a58c371ad694d1264b5',
  measurementId: 'G-B3S4T5L5QG',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
