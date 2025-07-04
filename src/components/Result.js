import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Result = () => {
    const { showResult, quizs, marks, startOver } = useContext(DataContext);
    const passed = marks > (quizs.length * 5 / 2);

    return (
        <section
            style={{
                display: showResult ? 'block' : 'none',
                backgroundColor: '#fdf6e3', // cream background
                color: '#2c3e50',           // muted blue
                fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Helvetica Neue', sans-serif'"
            }}
        >
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div
                            className="text-center p-5 rounded shadow"
                            style={{
                                backgroundColor: passed ? '#dbe9f4' : '#e0e0e0', // muted blue or soft grey background
                                color: '#2c3e50',
                                borderRadius: '12px',
                                fontWeight: '500'
                            }}
                        >
                            <h1 className='mb-2 fw-bold'>
                                {passed ? 'Awesome!' : 'Uh uh!'}
                            </h1>
                            <h3 className='mb-3 fw-bold'>
                                Your score is {marks} out of {quizs.length * 5}
                            </h3>

                            <button
                                onClick={startOver}
                                className="btn fw-bold"
                                style={{
                                    padding: '10px 25px',
                                    backgroundColor: '#4b79a1', // Muted blue button
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Start Over
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;
