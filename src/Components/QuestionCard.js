import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { DataContext } from './DataContext';
class QuestionCard extends Component {
  state = {};
  static contextType = DataContext;

  render() {
    return (
      <div>
        <Typography
          variant='body1'
          style={{ textAlign: 'left', fontWeight: 'bolder' }}
        >
          Question {this.props.questionCount + 1}
        </Typography>
        <hr />
        <br></br>
        <Typography
          style={{
            textAlign: 'left',
            fontFamily: 'Montserrat ,sans-serif',
            fontSize: '1.2rem',
            overflowWrap: 'break-word',
          }}
        >
          {this.props.question}
        </Typography>
        <br></br>
      </div>
    );
  }
}

export default QuestionCard;
