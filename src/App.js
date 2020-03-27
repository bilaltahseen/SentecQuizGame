import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import QuestionCard from './Components/QuestionCard';
import AnswerCard from './Components/AnswerCard';
import TopBar from './Components/TopBar';
import firebase from 'firebase/app';
import 'firebase/firestore';
import DataProvider from './Components/DataContext';
class App extends Component {
  state = {
    questions: [],
    questionCount: 0,
    currentQuestion: '',
  };

  async getQuestionsData() {
    let questions = [...this.state.questions];
    const querySnapshot = await firebase
      .firestore()
      .collection('Questions/Easy/QuestionsData')
      .get();
    querySnapshot.docs
      .sort(() => Math.random() - 0.5)
      .forEach(document => {
        questions.push({
          questionPara: document.data()['question'],
          options: document.data()['options'],
          correctAnswer: window.btoa(
            Math.random()
              .toString(36)
              .substring(2, 15) + document.data()['correctAnswer']
          ),
        });
      });
    this.setState({ questions: questions });
  }
  async componentDidMount() {
    await this.getQuestionsData();
    this.pullfromArray();
  }

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
      <DataProvider>
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
          </Container>
        </div>
      </DataProvider>
    );
  }
}

export default App;
