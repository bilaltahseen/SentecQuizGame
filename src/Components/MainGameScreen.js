import React, { Component, Suspense } from 'react';

import { DataContext } from './DataContext';
import { CircularProgress } from '@material-ui/core';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';

const NextLevelModal = React.lazy(() => import('./NexLevelModal'));
const GenericModal = React.lazy(() => import('./GenericModal'));
const GameOver = React.lazy(() => import('./GameOver'));

class MainGameScreen extends Component {
  state = {
    questions_from_api: [],
    randomImage: '',
    nextlevel: false,
    questionCount: 0,
    SET: 'EasySET',
  };
  static contextType = DataContext;

  async componentDidMount() {
    const [state] = await this.context;
    this.setState({ questions_from_api: state.questions_from_api });
    this.pullfromArray();
  }
  pullfromArray(SET = this.state.SET) {
    if (this.state.questions_from_api.data[SET].length > 0) {
      let index = Math.floor(
        Math.random() * this.state.questions_from_api.data[SET].length
      );
      let randomImage = this.state.questions_from_api.data[SET][index];
      this.state.questions_from_api.data[SET].splice(index, 1);
      this.setState({
        randomImage: randomImage,
      });
    }
  }

  componentDidUpdate() {
    const [state, dispatch] = this.context;
    if (state.questionCount === 5 && state.level === 'Easy') {
      dispatch({ type: 'RESET_COUNT' });
      dispatch({ type: 'NEXT_LEVEL' });
      dispatch({ type: 'LEVEL', payload: 'Medium' });
      this.setState({ SET: 'MediumSET' });
      this.forceUpdate(() => {
        this.pullfromArray();
      });
    }
    if (state.questionCount === 5 && state.level === 'Medium') {
      dispatch({ type: 'RESET_COUNT' });
      dispatch({ type: 'NEXT_LEVEL' });
      dispatch({ type: 'LEVEL', payload: 'Hard' });
      this.setState({ SET: 'HardSET' });
      this.forceUpdate(() => {
        this.pullfromArray();
      });
    }
    if (state.questionCount === 5 && state.level === 'Hard') {
      dispatch({ type: 'GAME_OVER' });
      dispatch({ type: 'RESET_COUNT' });
      dispatch({ type: 'LEVEL', payload: 'Finished' });
    }
  }

  render() {
    const [state] = this.context;
    const gameOver = (
      <Suspense fallback={<div></div>}>
        <GameOver />
      </Suspense>
    );
    const genericModal = (
      <Suspense fallback={<div></div>}>
        <GenericModal buttonText='Try Again' Ttype='h4' title='Times Up' />
      </Suspense>
    );
    const modal = (
      <Suspense fallback={<div></div>}>
        <NextLevelModal />
      </Suspense>
    );

    const QsToDisplay =
      !state.isStart & (this.state.randomImage !== '') & !state.timeOut ? (
        <div>
          <QuestionCard
            questionCount={state.questionCount}
            question={this.state.randomImage['questionPara']}
          />

          <AnswerCard
            func={this.pullfromArray.bind(this)}
            crt_answer={this.state.randomImage['CorrectAnswer']}
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
      <React.Fragment>
        {QsToDisplay}
        {state.timeOut ? genericModal : ''}
        {state.nextLevel ? modal : ''}
        {state.level === 'Finished' ? gameOver : ''}
      </React.Fragment>
    );
  }
}

export default MainGameScreen;
