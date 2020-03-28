import React, { Component } from 'react';
import { Backdrop } from '@material-ui/core';
import { DataContext } from '../Components/DataContext';
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
class StartScreen extends Component {
  state = { name: '' };
  static contextType = DataContext;
  changeText(event) {
    this.setState({ name: event.target.value });
  }
  playButton() {
    this.context.setIsStart(false);
    const audio = new Audio('/submit.wav');
    audio.play();
    this.context.setUser(this.state.name);
  }
  render() {
    return (
      <div>
        <Backdrop
          style={{ zIndex: 1, color: '#fff', padding: '5%' }}
          open={this.context.isStart}
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
            <Paper style={{ backgroundColor: '#e78330', padding: '10px' }}>
              <center>
                <Typography
                  style={{
                    color: '#fff',
                    fontFamily: 'Montserrat ,sans-serif',
                  }}
                  variant='h5'
                >
                  <strong>Are you that smart?</strong>
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
              <p>Enter your name to proceed</p>
              <TextField
                style={{
                  backgroundColor: '#fff',
                  width: '80%',
                }}
                type='text'
                InputProps={{
                  style: {
                    fontSize: '1.5rem',
                    textAlignLast: 'center',
                  },
                }}
                onChange={this.changeText.bind(this)}
              />
              <h3>Instructions</h3>
              <center>
                <strong>
                  <p>
                    There are 3 levels in this quiz game each level have 5
                    questions with 4 multiple choices select any one of them and
                    proceed to the next one the time allocated is 15 mins. Once
                    all the questions are submitted your score will be posted
                    and will announce the winner.
                  </p>
                </strong>
              </center>
              <br></br>
              <br></br>
              <Button
                disabled={this.state.name === ''}
                onClick={this.playButton.bind(this)}
                fullWidth
                style={{
                  backgroundColor: this.state.name === '' ? 'gray' : '#e78330',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat ,sans-serif',
                }}
                variant='contained'
              >
                Play Now
              </Button>
            </div>
          </Container>
        </Backdrop>
      </div>
    );
  }
}

export default StartScreen;
