import React, { Component } from 'react';
import { Backdrop, Container, Typography, Grow } from '@material-ui/core';
import poperImage from '../assets/giphy.gif';
import { DataContext } from './DataContext';
import PlayAudio from './PlayAudio';
class NextLevelModal extends Component {
  static contextType = DataContext;
  componentDidMount() {
    const [, dispatch] = this.context;
    PlayAudio('NEXT_LEVEL');
    setTimeout(() => dispatch({ type: 'NEXT_LEVEL' }), 2000);
  }

  render() {
    const [state] = this.context;
    return (
      <div>
        <Backdrop
          style={{ zIndex: 1, color: '#fff', padding: '5%' }}
          open={state.nextLevel}
        >
          <Grow in={state.nextLevel}>
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
