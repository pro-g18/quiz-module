import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pass, correctAnswers, totalQuestions, incorrectAnswers, questions, answers } = location.state;

    const handleRetake = () => {
        navigate('/quiz');
    };

    return (
        <div className="result-container">
            <h1>{pass ? 'Congratulations, You Passed!' : 'Sorry, You Failed.'}</h1>
            <p><strong>Marks Scored:</strong> {correctAnswers} / {totalQuestions}</p>
            <p><strong>Correct Answers:</strong> {correctAnswers}</p>
            <p><strong>Incorrect Answers:</strong> {incorrectAnswers}</p>

            <div className="question-review">
                {questions.map((q, index) => (
                    <div 
                        key={q._id} 
                        className={`review-box ${q.correctAnswer === answers[q._id] ? 'correct' : 'incorrect'}`}
                    >
                        <div className="question-number">
                            <strong>Question {index + 1}</strong>
                        </div>
                        <h2>{q.question}</h2>
                        <p><strong>Your Answer:</strong> {answers[q._id]}</p>
                        <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleRetake}>{pass ? 'Next' : 'Retake'}</button>
        </div>
    );
};

export default Result;
