import React from 'react';
import { useDataContext } from '../context/dataContext';

const FlashcardImport = () => {
  const { importFlashcards } = useDataContext();

  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        const importedData = JSON.parse(fileReader.result);
        const action = window.confirm('Replace existing flashcards? Click "Cancel" to merge.');
        importFlashcards(importedData, action);
      } catch (error) {
        alert('Invalid JSON file!');
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className="text-center my-3">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ padding: '8px', fontSize: '1rem' }}
      />
    </div>
  );
};

export default FlashcardImport;
