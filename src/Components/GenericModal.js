import React, { Component } from 'react';
import {
  Backdrop,
  Container,
  Typography,
  Grow,
  Button,
} from '@material-ui/core';
import { DataContext } from './DataContext';
import { withRouter } from 'react-router-dom';
import PlayAudio from './PlayAudio';

class GenericModal extends Component {
  state = {
    modalLoaded: true,
  };
  static contextType = DataContext;
  componentDidMount() {
    PlayAudio('TIME_UP');
  }

  render() {
    return (
      <div>
        <Backdrop
          style={{ zIndex: 1, color: '#fff', padding: '5%' }}
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
              <Typography
                align='center'
                variant={this.props.Ttype}
                style={{
                  fontFamily: 'Montserrat ,sans-serif',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                {this.props.title}
              </Typography>
              <center>
                <Button
                  onClick={() => {
                    this.setState({ modalLoaded: false });
                    window.location.reload();
                  }}
                  fullWidth
                  style={{
                    backgroundColor: '#e78330',
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat ,sans-serif',
                  }}
                  variant='contained'
                >
                  {this.props.buttonText}
                </Button>
              </center>
            </Container>
          </Grow>
        </Backdrop>
      </div>
    );
  }
}

export default withRouter(GenericModal);
