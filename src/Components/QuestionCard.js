import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
class QuestionCard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Typography
          variant='body1'
          style={{ textAlign: 'left', fontWeight: 'bolder' }}
        >
          Question {this.props.questionCount}
        </Typography>
        <hr />
        <Typography
          style={{
            textAlign: 'center',
            fontFamily: 'Montserrat ,sans-serif',
            fontSize: '1.2rem',
          }}
        >
          {this.props.question}
        </Typography>
      </div>
    );
  }
}

export default QuestionCard;
