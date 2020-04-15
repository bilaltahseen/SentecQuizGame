import React, { Component } from 'react';
import { Paper, Avatar } from '@material-ui/core';
import { DataContext } from './DataContext';

class TopBar extends Component {
  intervalID = 0;
  state = {
    time: 900,
    timerLoaded: true,
  };

  static contextType = DataContext;

  async componentDidUpdate() {
    const [state] = this.context;

    if (!state.isStart && this.state.timerLoaded) {
      this.timingFunc();
      this.setState({ timerLoaded: false });
    }
    if (state.gameOver) {
      clearInterval(this.intervalID);
    }
  }
  timingFunc() {
    const [, dispatch] = this.context;
    this.intervalID = setInterval(() => {
      let time = this.state.time;
      this.setState({ time: (time -= 1) });
      if (time <= 0) {
        clearInterval(this.intervalID);
        dispatch({ type: 'TIME_OUT' });
      }
    }, 1000);
  }

  render() {
    const [state] = this.context;
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Paper
            style={{
              padding: '2px',
              width: '35.33%',
              backgroundColor: '#e78330',
              color: '#fff',
            }}
            variant='outlined'
          >
            <center>
              <h4>{state.userDetails.userName}</h4>
            </center>
          </Paper>
          <Paper
            style={{
              padding: '2px',
              width: '40.33%',
              backgroundColor: '#e78330',
              color: '#fff',
            }}
            variant='outlined'
          >
            <center>
              <h4>
                Time Left : {Math.floor(this.state.time / 60)}:
                {this.state.time - Math.floor(this.state.time / 60) * 60}
              </h4>
            </center>
          </Paper>
          <center>
            <Avatar
              style={{ width: '50px', height: '50px', marginTop: '15%' }}
              alt='Remy Sharp'
              src={state.userDetails.userPhotoURL}
            />
          </center>
        </div>
        <br></br>
        <Paper
          style={{ backgroundColor: '#e78330', color: '#fff' }}
          variant='outlined'
        >
          <center>
            <h2>Level : {state.level}</h2>
          </center>
        </Paper>
        <br></br>
      </div>
    );
  }
}

export default TopBar;
