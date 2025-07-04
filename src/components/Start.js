import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Start = () => {
    const { startQuiz, showStart } = useContext(DataContext);

    return (
        <section
            className="text-center"
            style={{
                display: showStart ? 'block' : 'none',
                backgroundColor: '#fdf6e3', // cream background
                color: '#2c3e50',           // muted blue
                fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Helvetica Neue', sans-serif"
            }}
        >
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <h1
                            className="fw-bold mb-4"
                            style={{ color: '#2c3e50' }}
                        >
                            Basic React JS Quiz
                        </h1>
                        <button
                            onClick={startQuiz}
                            className="btn fw-bold"
                            style={{
                                padding: '10px 25px',
                                backgroundColor: '#dbe9f4', // muted blue
                                color: '#2c3e50',            // dark blue text
                                border: 'none',
                                borderRadius: '8px',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;
