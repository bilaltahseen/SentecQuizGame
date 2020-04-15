import React, { Component } from 'react';
import { Container, Paper, Grid } from '@material-ui/core';
import firebase from 'firebase/app';
import Axios from 'axios';
class Score extends Component {
  state = {
    data: [],
    auth: false,
  };
  componentDidMount() {
    this.checkUser();
  }

  checkUser() {
    const emailA = prompt('Enter Your Email');
    const passwordA = prompt('Enter Your Password');
    firebase
      .auth()
      .signInWithEmailAndPassword(emailA, passwordA)
      .then((result) => {
        if (result.user) {
          result.user
            .getIdToken()
            .then((token) => {
              this.getScoreFB(token);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  getScoreFB(token) {
    Axios({
      url: '/getscore',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const userCard = this.state.scoreData
      ? this.state.scoreData.map((item) => {
          return (
            <div key={item.userName} style={{ padding: '10px' }}>
              <Paper style={{ padding: 10 }} elevation={3}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <center>
                      <strong>
                        <p>{item.userName}</p>
                      </strong>
                    </center>
                  </Grid>
                  <Grid item xs={6}>
                    <center>
                      <strong>
                        <p>Score : {item.userScore}</p>
                      </strong>
                    </center>
                  </Grid>
                  <Grid item xs={12}>
                    <center>
                      <strong>
                        <p>
                          Played At :{' '}
                          {new Date(
                            item.userAuthTime['_seconds'] * 1000
                          ).toLocaleString()}
                        </p>
                      </strong>
                    </center>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })
      : '';

    return (
      <React.Fragment>
        <Container
          disableGutters
          style={{
            backgroundColor: '#2788cc',
            color: 'white',
            padding: '5%',
            margin: 'auto',
          }}
          maxWidth='lg'
        >
          <Paper style={{ backgroundColor: '#fff' }}>
            <h1
              style={{
                color: '#e78330',
                fontFamily: 'Montserrat ,sans-serif',
                textAlign: 'center',
                fontWeight: 'bolder',
              }}
            >
              Score Board
            </h1>
            {userCard}
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

export default Score;
