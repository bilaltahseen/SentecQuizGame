import React, { Component } from 'react';
import { Paper, Button, Avatar } from '@material-ui/core';
import { DataContext } from '../Components/DataContext';

class AnswerCard extends Component {
  static contextType = DataContext;
  state = {
    selectedValue: '',
    isOk: false,
    score: 0,
  };

  componentDidMount() {
    console.log('[AnswerCard]');
  }
  submitAnswer() {
    this.props.func();
    const currentAnswer = window.atob(this.props.crt_answer);
    if (
      this.state.selectedValue.toString() ===
      currentAnswer.charAt(currentAnswer.length - 1)
    ) {
      console.log('Correct');
      const currentScore = this.context.score;
      this.context.setScore(currentScore + 10);
      console.log(this.context.score);
    } else {
      console.log('Wrong');
    }
    const audio = new Audio('/submit.wav');
    audio.play();
    this.setState({ selectedValue: '' });
    this.context.setQuestionCount((this.context.questionCount += 1));
  }

  getRef(index) {
    this.setState({ selectedValue: index });
    const audio = new Audio('/button.wav');
    audio.play();
  }
  render() {
    const answersMap = this.props.answers
      ? this.props.answers.map((choice, index) => {
          return (
            <div key={index}>
              <Paper
                ref={this[`AnswerRef_${index}`]}
                onClick={this.getRef.bind(this, index)}
                style={{
                  width: '100%',
                  borderRadius: '23px',
                  transition: '0.2s',
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
                      paddingLeft: '2%',
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
