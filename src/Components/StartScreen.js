import React, { Component } from 'react';
import { Backdrop, Button } from '@material-ui/core';
import { DataContext } from '../Components/DataContext';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Typography, Container, Paper } from '@material-ui/core';
import GenericModal from './GenericModal';
import Axios from 'axios';

class StartScreen extends Component {
  static contextType = DataContext;
  state = {
    alreadyPlayed: false,
    auth: false,
    splash: true,
  };

  playButton() {
    const [, dispatch] = this.context;
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: 'USER_DETAILS',
          payload: {
            userName: result.user.displayName,
            userPhotoURL: result.user.photoURL,
          },
        });
        result.user.getIdToken().then((token) => {
          this.loadData(token);
        });
      })
      .catch((error) => {
        alert(error);
      });
  }
  loadData(idToken) {
    const [, dispatch] = this.context;
    Axios({
      url: '/getdata',
      method: 'GET',
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .then((response) => {
        dispatch({
          type: 'QUESTIONS_FROM_API',
          payload: response.data,
        });
      })
      .then(() => {
        dispatch({
          type: 'IS_START',
        });
      })
      .then(() => {
        setTimeout(() => {
          dispatch({
            type: 'LOGED_IN',
          });
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            this.setState({ alreadyPlayed: true });
          } else {
            alert(error);
          }
        }
      });
  }

  render() {
    const [state] = this.context;

    const StartScreen = (
      <div>
        <Backdrop
          style={{ zIndex: 1, color: '#fff', padding: '5%' }}
          open={state.isStart}
        >
          <Container
            maxWidth='xs'
            style={{
              backgroundColor: '#2788cc',
              justifyContent: 'center',
              padding: '5%',
              borderRadius: '10px',
            }}
          >
            {this.state.alreadyPlayed ? (
              <GenericModal
                buttonText='Quit'
                Ttype='h5'
                title='Your score is already updated'
              />
            ) : (
              ''
            )}
            <Paper style={{ backgroundColor: '#e78330', padding: '10px' }}>
              <center>
                <Typography
                  style={{
                    color: '#fff',
                    fontFamily: 'Montserrat ,sans-serif',
                    fontWeight: '100',
                  }}
                  variant='h5'
                >
                  <strong>Are you smarter?</strong>
                </Typography>
              </center>
            </Paper>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Montserrat ,sans-serif',
              }}
            >
              <h3>Instructions</h3>
              <p style={{ lineHeight: '150%', textAlign: 'left' }}>
                There are 3 levels in this quiz game each level have{' '}
                <strong>20</strong> questions with 4 multiple choices select any
                one of them and proceed to the next one the time allocated is{' '}
                <strong>20 mins.</strong> Once all the questions are submitted
                your score will be posted and we'll announce the winner.
              </p>

              <br></br>

              <Button
                onClick={this.playButton.bind(this)}
                style={{
                  color: '#3b5998',
                  backgroundColor: '#fff',
                  fontWeight: 'bold',
                }}
                color='inherit'
                variant='contained'
              >
                LOGIN WITH FACEBOOK
              </Button>
              <center>
                <p style={{ fontSize: 12, opacity: 0.7 }}>
                  <strong>
                    All rights reserved sentec@20/finalartproduct ®
                  </strong>
                </p>
              </center>
            </div>
          </Container>
        </Backdrop>
      </div>
    );
    return <div>{StartScreen}</div>;
  }
}

export default StartScreen;
