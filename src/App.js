import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import TopBar from './Components/TopBar';
import { DataContext } from './Components/DataContext';
import MainGameScreen from './Components/MainGameScreen';
import StartScreen from './Components/StartScreen';

class App extends Component {
  state = {
    Snackbar: true,
  };
  static contextType = DataContext;

  handleClose() {
    this.setState({ Snackbar: false });
  }

  render() {
    const [state] = this.context;

    return (
      <center>
        <div>
          <Container
            style={{
              backgroundColor: '#2788cc',
              color: 'white',
              height: '100%',
              padding: '5%',
              margin: 0,
            }}
            maxWidth='lg'
          >
            <TopBar />
            {!state.loggedIn ? <StartScreen /> : ''}
            {!state.isStart ? <MainGameScreen /> : ''}
          </Container>
        </div>
      </center>
    );
  }
}

export default App;
