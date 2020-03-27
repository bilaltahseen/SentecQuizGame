import React, { Component } from 'react';
import { Paper, Radio, Button, Avatar } from '@material-ui/core';
import buttonClick from '../assets/sfx/button.wav';
class AnswerCard extends Component {
  state = {
    selectedValue: '',
    isOk: false,
    score: 0,
  };
  AnswerRef_0 = React.createRef();
  AnswerRef_1 = React.createRef();
  AnswerRef_2 = React.createRef();
  AnswerRef_3 = React.createRef();

  componentDidMount() {
    console.log('[AnswerCard]');
  }
  submitAnswer() {
    const score = this.state.score;
    this.setState({ selectedValue: '' });
    this.props.func();
    const currentAnswer = window.atob(this.props.crt_answer);
    if (
      this.state.selectedValue ===
      currentAnswer.charAt(currentAnswer.length - 1)
    ) {
      console.log('Correct');
      this.setState({ score: (score += 10) });
    } else {
      console.log('Wrong');
    }
  }

  getRef(index) {
    this.setState({ selectedValue: index });
    const audio = new Audio({ buttonClick });
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
                    <strong>{index + 1}</strong>
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
            onClick={this.submitAnswer.bind(this)}
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
            Submit
          </Button>
        </center>
      </div>
    );
  }
}

export default AnswerCard;
