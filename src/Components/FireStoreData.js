import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { Component } from 'react';
import { DataContext } from './DataContext';
import { withRouter, Redirect } from 'react-router-dom';
class FirebaseHOC extends Component {
  static contextType = DataContext;
  state = {
    loadedLevel: 'Easy',
  };
  async getQuestionsEASYData() {
    let questions = [];
    const querySnapshot = await firebase
      .firestore()
      .collection(`Questions/Easy/QuestionsData`)
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
    this.context.setEasyQsSet(questions);
  }
  async getQuestionsMEDIUMData() {
    let questions = [];
    const querySnapshot = await firebase
      .firestore()
      .collection(`Questions/Medium/QuestionsData`)
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
    this.context.setMediumQsSet(questions);
  }

  async componentDidMount() {
    await this.getQuestionsEASYData();
    console.log('FetechData[FireStoreData.js]-easy');
    await this.getQuestionsMEDIUMData();
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(FirebaseHOC);
