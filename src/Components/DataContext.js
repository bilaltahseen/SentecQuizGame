import React, { useState, createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = props => {
  const [score, setScore] = useState(10);
  return (
    <DataContext.Provider value={{ score, setScore }}>
      {props.children}
    </DataContext.Provider>
  );
};
export default DataProvider;
