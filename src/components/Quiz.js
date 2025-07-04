import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Quiz = () => {
  const {
    showQuiz,
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
    skipQuestion
  } = useContext(DataContext);

  const isLastQuestion = questionIndex + 1 === quizs.length;

  return (
    <section
      style={{
        display: showQuiz ? 'block' : 'none',
        backgroundColor: '#fff5ee',
        color: '#2c3e50',
        fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Helvetica Neue', sans-serif'"
      }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4 shadow"
              style={{
                backgroundColor: '#e0f7f1',
                border: '2px solid #add8e6',
                borderRadius: '12px'
              }}
            >
              <div className="d-flex justify-content-between gap-md-3">
                <h5 className="mb-2 lh-base" style={{ fontSize: '1.25rem', color: '#2c3e50' }}>
                  {question?.question}
                </h5>
                <h5 style={{ color: '#ff6f61', width: '100px', textAlign: 'right' }}>
                  {questionIndex + 1} / {quizs.length}
                </h5>
              </div>

              <div>
                {question?.options?.map((item, index) => (
                  <button
                    key={index}
                    className="w-100 text-start btn py-2 px-3 mt-3"
                    style={{
                      backgroundColor: correctAnswer === item ? '#8fd19e' : '#fddde6',
                      color: '#2c3e50',
                      border: '1px solid #d0d0d0',
                      borderRadius: '8px',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                    onClick={(event) => checkAnswer(event, item)}
                    disabled={!!selectedAnswer}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="d-flex flex-column flex-md-row gap-2 mt-4">
                {/* Skip Button */}
                <button
                  className="btn py-2 w-100 fw-bold"
                  onClick={skipQuestion}
                  disabled={!!selectedAnswer}
                  style={{
                    backgroundColor: '#ffe0b2',
                    color: '#2c3e50',
                    borderRadius: '8px'
                  }}
                >
                  Skip
                </button>

                {/* Next or Show Result */}
                {isLastQuestion ? (
                  <button
                    className="btn py-2 w-100 fw-bold"
                    onClick={showTheResult}
                    disabled={!selectedAnswer}
                    style={{
                      backgroundColor: '#add8e6',
                      color: '#2c3e50',
                      borderRadius: '8px'
                    }}
                  >
                    Show Result
                  </button>
                ) : (
                  <button
                    className="btn py-2 w-100 fw-bold"
                    onClick={nextQuestion}
                    disabled={!selectedAnswer}
                    style={{
                      backgroundColor: '#add8e6',
                      color: '#2c3e50',
                      borderRadius: '8px'
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
