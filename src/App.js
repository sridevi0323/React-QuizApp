import React from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { DataProvider, useDataContext } from './context/dataContext';

const AppContent = () => {
  const { showStart, showResult } = useDataContext();

  return (
    <>
      {showStart && <Start />}
      <Quiz />
      {showResult && <Result />}
    </>
  );
};

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
