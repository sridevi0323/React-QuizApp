import React, { useContext, useRef } from 'react';
import DataContext from '../context/dataContext';

const Result = () => {
  const {
    showResult,
    quizs,
    marks,
    startOver,
    score,
    replaceFlashcards,
    mergeFlashcards
  } = useContext(DataContext);

  const passed = marks > (quizs.length * 5 / 2);
  const fileInputRef = useRef();

  const exportFlashcards = () => {
    const dataStr = JSON.stringify(quizs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'flashcards.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e, mode) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json)) {
          alert("Invalid format: JSON should be an array");
          return;
        }
        mode === 'replace' ? replaceFlashcards(json) : mergeFlashcards(json);
        alert(`Flashcards ${mode === 'replace' ? 'replaced' : 'merged'} successfully!`);
      } catch (err) {
        alert("Invalid JSON file!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <section
      style={{
        display: showResult ? 'block' : 'none',
        backgroundColor: '#fdf6e3',
        color: '#2c3e50',
        fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Helvetica Neue', sans-serif'"
      }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div
              className="text-center p-5 rounded shadow"
              style={{
                backgroundColor: passed ? '#dbe9f4' : '#e0e0e0',
                color: '#2c3e50',
                borderRadius: '12px',
                fontWeight: '500'
              }}
            >
              <h1 className='mb-2 fw-bold'>
                {passed ? 'Awesome!' : 'Uh oh!'}
              </h1>

              <h3 className='mb-3 fw-bold'>
                Your Score: {marks} / {quizs.length * 5}
              </h3>

              <div className="text-start mt-4 mb-3">
                <p><strong>✅ Correct Answers:</strong> {score.correct}</p>
                <p><strong>❌ Incorrect Answers:</strong> {score.incorrect}</p>
                <p><strong>🚫 Skipped Questions:</strong> {score.skipped}</p>
              </div>

              <div className="d-grid gap-2">
                <button
                  onClick={startOver}
                  className="btn fw-bold"
                  style={{
                    padding: '10px 25px',
                    backgroundColor: '#4b79a1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    letterSpacing: '0.5px'
                  }}
                >
                  Start Over
                </button>

                <button
                  onClick={exportFlashcards}
                  className="btn fw-bold mt-2"
                  style={{
                    backgroundColor: '#228B22',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    letterSpacing: '0.5px'
                  }}
                >
                  Export Flashcards (JSON)
                </button>

                <div className="d-flex justify-content-center gap-2 mt-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      fileInputRef.current.dataset.mode = 'replace';
                      fileInputRef.current.click();
                    }}
                  >
                    Replace Flashcards
                  </button>

                  <button
                    className="btn btn-info text-white"
                    onClick={() => {
                      fileInputRef.current.dataset.mode = 'merge';
                      fileInputRef.current.click();
                    }}
                  >
                    Merge Flashcards
                  </button>
                </div>

                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, fileInputRef.current.dataset.mode)}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
