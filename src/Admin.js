import React, { Component } from 'react';
import {
  Container,
  Paper,
  TextField,
  NativeSelect,
  Button,
} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import Axios from 'axios';
class Admin extends Component {
  state = {
    question: '',
    options: [],
    correctAnswer: '',
    auth: '',
    level: '',
  };
  onFieldChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  pushToFireStore() {
    Axios({
      url: '/postdata',
      method: 'POST',
      headers: { Authorization: `Bearer ${this.state.auth}` },
      data: {
        level: this.state.level,
        question: this.state.question,
        options: this.state.options,
        CorrectAnswer: this.state.correctAnswer,
      },
    })
      .then((response) => {
        this.setState({
          question: '',
          options: [],
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: '',
        });
      })
      .catch((err) => {
        alert(err);
        this.setState({
          question: '',
          options: [],
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: '',
        });
      });
  }
  async submitHandler() {
    let options = [...this.state.options];
    for (let i = 1; i <= 4; i++) {
      options.push(this.state[`option${i}`]);
    }
    await this.setState({ options: options });
    this.pushToFireStore();
  }
  checklogin() {
    const email = prompt('Enter Your Email');
    const password = prompt('Enter Your Password');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result) {
          result.user.getIdToken().then((token) => {
            this.setState({ auth: token });
          });
        } else {
          return;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  componentDidMount() {
    this.checklogin();
  }

  render() {
    const condition =
      this.state.question === '' ||
      this.state.correctAnswer === '' ||
      this.state.option1 === '' ||
      this.state.option2 === '' ||
      this.state.option3 === '' ||
      this.state.level === '' ||
      this.state.option4 === '';
    const adminPannel = this.state.auth ? (
      <Paper
        elevation={2}
        style={{
          backgroundColor: '#fff',
          padding: '2%',
          color: '#e78330',
          fontFamily: 'Montserrat ,sans-serif',
        }}
      >
        <h2>Select Level</h2>
        <NativeSelect
          required
          fullWidth
          onChange={this.onFieldChangeHandler.bind(this)}
          name='level'
          style={{ marginTop: '10px' }}
        >
          <option value={''}></option>
          <option value={'Easy'}>Easy</option>
          <option value={'Medium'}>Medium</option>
          <option value={'Hard'}>Hard</option>
        </NativeSelect>
        <h2>Enter Questions Detail</h2>

        <TextField
          name='question'
          value={this.state.question}
          placeholder='Enter Question'
          type='text'
          variant='outlined'
          fullWidth
          onChange={this.onFieldChangeHandler.bind(this)}
          required
          inputProps={{
            maxLength: 191,
          }}
          multiline
        ></TextField>
        <h4>Enter Options</h4>
        <div
          style={{
            margin: 0,
            padding: '3%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            name='option1'
            value={this.state.option1}
            onChange={this.onFieldChangeHandler.bind(this)}
            required
            style={{ marginTop: '10px' }}
            placeholder='Option 1'
            type='text'
            inputProps={{
              maxLength: 25,
            }}
            fullWidth
            variant='outlined'
          ></TextField>
          <TextField
            name='option2'
            value={this.state.option2}
            onChange={this.onFieldChangeHandler.bind(this)}
            required
            style={{ marginTop: '10px' }}
            type='text'
            inputProps={{
              maxLength: 25,
            }}
            placeholder='Option 2'
            fullWidth
            variant='outlined'
          ></TextField>
          <TextField
            name='option3'
            value={this.state.option3}
            onChange={this.onFieldChangeHandler.bind(this)}
            required
            style={{ marginTop: '10px' }}
            type='text'
            inputProps={{
              maxLength: 25,
            }}
            placeholder='Option 3'
            fullWidth
            variant='outlined'
          ></TextField>
          <TextField
            name='option4'
            value={this.state.option4}
            onChange={this.onFieldChangeHandler.bind(this)}
            required
            style={{ marginTop: '10px' }}
            type='text'
            inputProps={{
              maxLength: 25,
            }}
            placeholder='Option 4'
            fullWidth
            variant='outlined'
          ></TextField>
          <h4>Select Correct Answer</h4>
          <NativeSelect
            required
            value={this.state.correctAnswer}
            fullWidth
            onChange={this.onFieldChangeHandler.bind(this)}
            name='correctAnswer'
            style={{ marginTop: '10px' }}
            placeholder='Correct Answer'
          >
            <option value={''}></option>
            <option value={0}>Option1</option>
            <option value={1}>Option2</option>
            <option value={2}>Option3</option>
            <option value={3}>Option4</option>
          </NativeSelect>
        </div>

        <Button
          disabled={condition}
          onClick={this.submitHandler.bind(this)}
          fullWidth
          style={{
            backgroundColor: condition ? 'gray' : '#e78330',
            color: '#fff',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat ,sans-serif',
          }}
          variant='contained'
        >
          Add Question
        </Button>
      </Paper>
    ) : (
      ''
    );
    return (
      <div>
        <center>
          <Container
            style={{
              backgroundColor: '#2788cc',
              color: 'white',
              padding: '5%',
              margin: 0,
            }}
            maxWidth='md'
          >
            {adminPannel}
          </Container>
        </center>
      </div>
    );
  }
}

export default Admin;
