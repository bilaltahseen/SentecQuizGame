import React, { useState, createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = props => {
  const [score, setScore] = useState(0);
  const [timeOut, setTimeOut] = useState(false);
  const [level, setlevel] = useState('Easy');
  const [EasyQsSet, setEasyQsSet] = useState('');
  const [MediumQsSet, setMediumQsSet] = useState('');
  const [HardQsSet, setHardQsSet] = useState('');
  const [user, setUser] = useState('Your Name');
  const [isStart, setIsStart] = useState(true);
  const [nextLevel, setNextLevel] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  return (
    <DataContext.Provider
      value={{
        score,
        setScore,
        timeOut,
        setTimeOut,
        level,
        setlevel,
        EasyQsSet,
        setEasyQsSet,
        user,
        setUser,
        isStart,
        setIsStart,
        MediumQsSet,
        setMediumQsSet,
        HardQsSet,
        setHardQsSet,
        questionCount,
        setQuestionCount,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataProvider;
