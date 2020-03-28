import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import QuestionCard from './Components/QuestionCard';
import AnswerCard from './Components/AnswerCard';
import TopBar from './Components/TopBar';
import StartScreen from './Components/StartScreen';
import { DataContext } from './Components/DataContext';
class App extends Component {
  state = {
    questions: '',
    questionCount: 0,
    randomImage: '',
    dataLoaded: false,
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
        questionCount: (questionCount += 1),
      });
    }
  }

  async getDatafromContext() {
    const questions = await this.context.EasyQsSet;
    this.setState({ questions: questions });
  }

  componentDidMount() {
    console.log(!this.context.isStart);
  }

  async componentDidUpdate() {
    if (!this.context.isStart && !this.state.dataLoaded) {
      console.log(this.context.EasyQsSet);
      await this.setState({
        questions: this.context.EasyQsSet,
        dataLoaded: true,
      });
      this.pullfromArray();
    }
  }

  render() {
    const QsToDisplay = this.state.randomImage ? (
      <div>
        <QuestionCard
          question={this.state.randomImage['questionPara']}
          questionCount={this.state.questionCount}
        />

        <AnswerCard
          func={this.pullfromArray.bind(this)}
          crt_answer={this.state.randomImage['correctAnswer']}
          answers={this.state.randomImage['options']}
        />
      </div>
    ) : (
      ''
    );
    return (
      <div>
        <Container
          style={{
            backgroundColor: '#2788cc',
            color: 'white',
            padding: '5%',
            margin: 0,
          }}
          maxWidth='sm'
        >
          <TopBar />
          {QsToDisplay}
          <StartScreen />
        </Container>
      </div>
    );
  }
}

export default App;
