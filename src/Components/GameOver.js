import React, { Component } from 'react';

import { Backdrop, Container, Grow, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { DataContext } from './DataContext';
import firebase from 'firebase/app';
import 'firebase/auth';
import completed from '../assets/completed.gif';
import PlayAudio from './PlayAudio';
import Axios from 'axios';

import CryptoAES from 'crypto-js/aes';

class GameOver extends Component {
  state = {
    modalLoaded: true,
    buttonDisabled: true,
    isSnackBarOpen: false,
  };
  handleClose() {
    this.setState({ isSnackBarOpen: !this.state.isSnackBarOpen });
  }
  static contextType = DataContext;
  pushScoreToFB() {
    const [state] = this.context;
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        Axios({
          url: '/postscore',
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          data: {
            encdbkey: actScEn,
            score: score,
          },
        })
          .then((response) => {
            this.setState({
              isSnackBarOpen: !this.state.isSnackBarOpen,
              buttonDisabled: !this.state.buttonDisabled,
            });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
    const iv = Math.floor(Math.random() * 9 + 1);
    const salt =
      Math.floor(Math.random() * 15 + 1) * 10 +
      Math.random().toString(36).substr(2, iv) +
      Math.floor(Math.random() * 15 + 1) * 10;
    const score = state.score;
    const ciphertext = CryptoAES.encrypt(score.toString(), salt);
    const actScEn =
      iv.toString() + (salt.length * iv).toString() + '/' + salt + ciphertext;
  }
  componentDidMount() {
    PlayAudio('FINISHED');
    this.pushScoreToFB();
  }
  render() {
    const SnackBar = this.state.isSnackBarOpen ? (
      <Snackbar
        open={this.state.isSnackBarOpen}
        autoHideDuration={3000}
        onClose={this.handleClose.bind(this)}
      >
        <Alert severity='success'>Score Uploaded!</Alert>
      </Snackbar>
    ) : (
      ''
    );
    return (
      <div>
        <Backdrop
          style={{
            zIndex: 1,
            color: '#fff',
            padding: '5%',
            backgroundImage: `url(${completed})`,
          }}
          open={this.state.modalLoaded}
        >
          <Grow in={this.state.modalLoaded}>
            <Container
              maxWidth='xs'
              style={{
                backgroundColor: '#2788cc',
                justifyContent: 'center',
                padding: '5%',
                borderRadius: '10px',
              }}
            >
              <h2>Congratulations you have completed the quiz</h2>
              <p>Your score will be published on our page</p>
              <Button
                disabled={this.state.buttonDisabled}
                onClick={() => {
                  this.setState({ modalLoaded: false });
                  window.location.reload();
                }}
                fullWidth
                style={{
                  backgroundColor: this.state.buttonDisabled
                    ? 'gray'
                    : '#e78330',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat ,sans-serif',
                }}
                variant='contained'
              >
                Quit Game
              </Button>
            </Container>
          </Grow>
        </Backdrop>
        {SnackBar}
      </div>
    );
  }
}

export default GameOver;
