import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Quiz = () => {
    const {
        showQuiz, question, quizs, checkAnswer, correctAnswer,
        selectedAnswer, questionIndex, nextQuestion, showTheResult
    } = useContext(DataContext);

    return (
        <section
            style={{
                display: showQuiz ? 'block' : 'none',
                backgroundColor: '#fff5ee', // Soft peach background
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
                                backgroundColor: '#e0f7f1', // Seafoam green card
                                border: '2px solid #add8e6', // Light blue border
                                borderRadius: '12px'
                            }}
                        >
                            <div className="d-flex justify-content-between gap-md-3">
                                <h5 className="mb-2 lh-base" style={{ fontSize: '1.25rem', color: '#2c3e50' }}>
                                    {question?.question}
                                </h5>
                                <h5 style={{ color: '#ff6f61', width: '100px', textAlign: 'right' }}>
                                    {quizs.indexOf(question) + 1} / {quizs?.length}
                                </h5>
                            </div>

                            <div>
                                {
                                    question?.options?.map((item, index) => (
                                        <button
                                            key={index}
                                            className="w-100 text-start btn py-2 px-3 mt-3"
                                            style={{
                                                backgroundColor:
                                                    correctAnswer === item ? '#8fd19e' : '#fddde6',
                                                color: '#2c3e50',
                                                border: '1px solid #d0d0d0',
                                                borderRadius: '8px',
                                                fontWeight: '500',
                                                fontSize: '1rem'
                                            }}
                                            onClick={(event) => checkAnswer(event, item)}
                                        >
                                            {item}
                                        </button>
                                    ))
                                }
                            </div>

                            {
                                (questionIndex + 1) !== quizs.length ? (
                                    <button
                                        className="btn py-2 w-100 mt-3 fw-bold"
                                        onClick={nextQuestion}
                                        disabled={!selectedAnswer}
                                        style={{
                                            backgroundColor: '#add8e6', // Light blue
                                            color: '#2c3e50',
                                            borderRadius: '8px',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        Next Question
                                    </button>
                                ) : (
                                    <button
                                        className="btn py-2 w-100 mt-3 fw-bold"
                                        onClick={showTheResult}
                                        disabled={!selectedAnswer}
                                        style={{
                                            backgroundColor: '#add8e6', // Light blue 
                                            color: '#2c3e50',
                                            borderRadius: '8px',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        Show Result
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
