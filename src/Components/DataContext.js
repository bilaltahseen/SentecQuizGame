import React, { createContext, useReducer } from 'react';
export const DataContext = createContext();

const initialState = {
  score: 0,
  timeOut: false,
  isStart: true,
  gameOver: false,
  nextLevel: false,
  userDetails: '',
  loggedIn: false,
  questionCount: 0,
  level: 'Easy',
  questions_from_api: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SCORE_UPD':
      return { ...state, score: (state.score += 10) };
    case 'TIME_OUT':
      return { ...state, timeOut: !state.timeOut };
    case 'LEVEL':
      return { ...state, level: action.payload };
    case 'IS_START':
      return { ...state, isStart: !state.isStart };
    case 'GAME_OVER':
      return { ...state, gameOver: !state.gameOver };
    case 'NEXT_LEVEL':
      return { ...state, nextLevel: !state.nextLevel };
    case 'USER_DETAILS':
      return { ...state, userDetails: action.payload };
    case 'LOGED_IN':
      return { ...state, loggedIn: !state.loggedIn };
    case 'QUESTION_COUNT':
      return { ...state, questionCount: (state.questionCount += 1) };
    case 'RESET_COUNT':
      return { ...state, questionCount: 0 };
    case 'QUESTIONS_FROM_API':
      return { ...state, questions_from_api: action.payload };
    default:
      return;
  }
};

const DataProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
