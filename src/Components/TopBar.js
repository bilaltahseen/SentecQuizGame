import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { DataContext } from './DataContext';
class TopBar extends Component {
  intervalID = 0;
  state = {
    time: 900,
    timerLoaded: true,
  };

  static contextType = DataContext;
  async componentDidUpdate() {
    if (!this.context.isStart && this.state.timerLoaded) {
      this.timingFunc();
      this.setState({ timerLoaded: false });
    }
  }
  timingFunc() {
    this.intervalID = setInterval(() => {
      let time = this.state.time;
      this.setState({ time: (time -= 1) });
      if (time <= 0) {
        clearInterval(this.intervalID);
        this.context.setTimeOut(true);
      }
    }, 1000);
  }

  render() {
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
              width: '50.33%',
              backgroundColor: '#e78330',
              color: '#fff',
            }}
            variant='outlined'
          >
            <center>
              <h4>{this.context.user}</h4>
            </center>
          </Paper>
          <Paper
            style={{
              padding: '2px',
              width: '37.33%',
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
        </div>
        <br></br>
        <Paper
          style={{ backgroundColor: '#e78330', color: '#fff' }}
          variant='outlined'
        >
          <center>
            <h2>Level : Easy</h2>
          </center>
        </Paper>
        <br></br>
      </div>
    );
  }
}

export default TopBar;
