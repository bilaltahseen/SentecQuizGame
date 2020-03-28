import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import TopBar from './Components/TopBar';
import StartScreen from './Components/StartScreen';

import MainGameScreen from './Components/MainGameScreen';

class App extends Component {
  // state = {
  //   questions: [],
  //   questionCount: 0,
  //   randomImage: '',
  //   dataLoaded: false,
  // };
  // static contextType = DataContext;

  // pullfromArray() {
  //   if (this.state.questions.length > 0) {
  //     let questionCount = this.state.questionCount;
  //     let index = Math.floor(Math.random() * this.state.questions.length);
  //     let randomImage = this.state.questions[index];
  //     this.state.questions.splice(index, 1);
  //     this.setState({
  //       randomImage: randomImage,
  //       questionCount: (questionCount += 1),
  //     });
  //   }
  // }

  // getDataMethod(level = 'Easy') {
  //   if (level === 'Easy') {
  //     this.setState({ questions: this.context.EasyQsSet });
  //     this.pullfromArray();
  //     console.log('EasySetLoaded');
  //   }
  //   if (level === 'Medium') {
  //     this.setState({ questions: this.context.MediumQsSet });
  //     this.pullfromArray();
  //     console.log('MediumSetLoaded');
  //   }
  // }

  // componentDidMount() {
  //   setTimeout(() => this.getDataMethod(), 1000);
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if ((this.context.level === 'Medium') & !this.state.dataLoaded) {
  //     this.getDataMethod('Medium');
  //     this.setState({ dataLoaded: false });
  //   }
  // }
  // // componentDidUpdate() {
  // //   if (!this.context.isStart) {
  // //     if (this.context.level === 'Easy' && !this.state.dataLoaded) {
  // //       this.setState({
  // //         questions: this.context.EasyQsSet,
  // //         dataLoaded: true,
  // //       });
  // //       this.pullfromArray();
  // //       console.log('Inner StateUpdate');
  // //     }
  // //     console.log('Outer StateUpdate');
  // //   }
  // // }

  render() {
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
          <MainGameScreen />
          <StartScreen />
        </Container>
      </div>
    );
  }
}

export default App;
