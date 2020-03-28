import React, { Component } from 'react';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';
import { DataContext } from './DataContext';
import { CircularProgress } from '@material-ui/core';
import NextLevelModal from './NexLevelModal';
class MainGameScreen extends Component {
  state = {
    questions: [],
    randomImage: '',
    nextlevel: false,
  };
  static contextType = DataContext;
  pullfromArray() {
    if (this.state.questions.length > 0) {
      let questionCount = this.state.questionCount;
      let index = Math.floor(Math.random() * this.state.questions.length);
      let randomImage = this.state.questions[index];
      this.state.questions.splice(index, 1);
      this.setState({
        randomImage: randomImage,
      });
    }
  }
  async getDataMethod(level = 'Easy') {
    if (level === 'Easy') {
      this.setState({ questions: this.context.EasyQsSet });
      this.pullfromArray();
      console.log('EasySetLoaded');
    }
    if (level === 'Medium') {
      this.setState({ questions: this.context.MediumQsSet });
      this.pullfromArray();
      console.log('MediumSetLoaded');
    }
  }

  componentDidMount() {
    setTimeout(() => this.getDataMethod(this.context.level), 2000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.context.questionCount === 5) {
      this.context.setlevel('Medium');
      this.forceUpdate(this.componentDidMount());
      this.context.setQuestionCount(0);
      this.setState({ nextlevel: true });
    }
    if (
      (this.context.questionCount === 5) &
      (this.context.level === 'Medium')
    ) {
      // this.context.setlevel('Medium');
      // this.forceUpdate(this.componentDidMount());
      // this.setState({ questionCount: 0 });
      // this.setState({ nextlevel: true });
      console.log('Hard');
    }
  }
  render() {
    const modal = <NextLevelModal />;
    const QsToDisplay =
      !this.context.isStart & (this.state.randomImage !== '') ? (
        <div>
          <QuestionCard question={this.state.randomImage['questionPara']} />

          <AnswerCard
            func={this.pullfromArray.bind(this)}
            crt_answer={this.state.randomImage['correctAnswer']}
            answers={this.state.randomImage['options']}
          />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}
        >
          <CircularProgress style={{ color: '#e78330' }} size={100} />
        </div>
      );
    return (
      <div>
        {QsToDisplay}
        {this.state.nextlevel ? modal : ''}
      </div>
    );
  }
}

export default MainGameScreen;
