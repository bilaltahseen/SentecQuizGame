import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { DataContext } from './DataContext';
class TopBar extends Component {
  state = {};
  static contextType = DataContext;
  render() {
    console.log(this.context);
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
              <h4>Bilal Tahseen</h4>
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
              <h4>Time : 1:00</h4>
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
        <button onClick={() => this.context.setScore(20)}></button>
      </div>
    );
  }
}

export default TopBar;
