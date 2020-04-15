import React, { Component } from 'react';
import { Paper, Button, Avatar } from '@material-ui/core';
import { DataContext } from '../Components/DataContext';
import PlayAudio from './PlayAudio';

class AnswerCard extends Component {
  static contextType = DataContext;
  state = {
    selectedValue: '',
    isOk: false,
    score: 0,
  };

  submitAnswer() {
    const [, dispatch] = this.context;
    this.props.func();
    const currentAnswer = window.atob(this.props.crt_answer);
    if (
      this.state.selectedValue.toString() ===
      currentAnswer.charAt(currentAnswer.length - 1)
    ) {
      dispatch({
        type: 'SCORE_UPD',
      });
    } else {
    }
    this.setState({ selectedValue: '' });
    PlayAudio('SUBMIT');
    dispatch({ type: 'QUESTION_COUNT' });
  }

  getRef(index) {
    this.setState({ selectedValue: index });
    PlayAudio('CLICK');
  }
  render() {
    const answersMap = this.props.answers
      ? this.props.answers.map((choice, index) => {
          return (
            <div key={index} onClick={this.getRef.bind(this, index)}>
              <Paper
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  transition: 'background-color 0.1s ease-in-out',
                  color: index === this.state.selectedValue ? '#fff' : '',
                  backgroundColor:
                    index === this.state.selectedValue ? '#e78330' : '',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Avatar style={{ backgroundColor: '#e78330' }}>
                    <strong>{String.fromCharCode(index + 65)}</strong>
                  </Avatar>
                  <p
                    style={{
                      fontFamily: 'Montserrat ,sans-serif',
                      fontSize: '12px',
                      paddingLeft: '1%',
                      fontWeight: 'bold',
                    }}
                  >
                    {choice}
                  </p>
                </div>
              </Paper>
              <br></br>
            </div>
          );
        })
      : '';
    return (
      <div>
        <audio id='audio' src='/button.mp3'></audio>
        {answersMap}
        <center>
          <Button
            disabled={this.state.selectedValue === ''}
            onClick={this.submitAnswer.bind(this)}
            fullWidth
            style={{
              backgroundColor:
                this.state.selectedValue === '' ? 'gray' : '#e78330',
              color: '#fff',
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'Montserrat ,sans-serif',
            }}
            variant='contained'
          >
            Submit
          </Button>
        </center>
      </div>
    );
  }
}

export default AnswerCard;
