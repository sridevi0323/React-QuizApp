import React from 'react';
import { useDataContext } from '../context/dataContext';

const FlashcardExport = () => {
  const { quizs } = useDataContext();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(quizs, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'flashcards.json';
    link.click();
  };

  return (
    <div className="text-center my-3">
      <button
        onClick={handleExport}
        className="btn"
        style={{
          backgroundColor: '#8fc1e3',
          padding: '8px 20px',
          borderRadius: '8px',
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
        }}
      >
        Export Flashcards
      </button>
    </div>
  );
};

export default FlashcardExport;
