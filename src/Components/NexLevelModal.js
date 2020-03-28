import React, { Component } from 'react';
import { Backdrop, Container, Typography, Grow } from '@material-ui/core';
import poperImage from '../assets/giphy.gif';
class NextLevelModal extends Component {
  state = {
    nexLevelLoaded: false,
  };
  componentDidMount() {
    setTimeout(() => this.setState({ nexLevelLoaded: true }), 1500);
    const audio = new Audio('/NextLevel.mp3');
    audio.play();
  }
  render() {
    return (
      <div>
        <Backdrop
          style={{ zIndex: 1, color: '#fff', padding: '5%' }}
          open={!this.state.nexLevelLoaded}
        >
          <Grow in={!this.state.nexLevelLoaded}>
            <Container
              maxWidth='xs'
              style={{
                backgroundColor: '#2788cc',
                justifyContent: 'center',
                padding: '5%',
                borderRadius: '10px',
              }}
            >
              <Typography
                align='center'
                variant='h4'
                style={{
                  fontFamily: 'Montserrat ,sans-serif',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Next Level
              </Typography>
              <center>
                <img width='200px' src={poperImage} alt='loading...' />
              </center>
            </Container>
          </Grow>
        </Backdrop>
      </div>
    );
  }
}

export default NextLevelModal;
