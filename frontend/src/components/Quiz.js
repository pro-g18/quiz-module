import React, { useState, useEffect } from 'react';
import { getQuizQuestions } from '../services/quizService';
import { useNavigate } from 'react-router-dom';
import './Quiz2.css';




const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [attempted, setAttempted] = useState(0);
    const navigate = useNavigate();




    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const quizQuestions = await getQuizQuestions();
                setQuestions(quizQuestions);
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
            }
        };
        fetchQuestions();
    }, []);




    const handleChange = (e, questionId) => {
        setAnswers({ ...answers, [questionId]: e.target.value });
        if (!answers[questionId]) {
            setAttempted(attempted + 1);
        }
    };




    const handleSubmit = () => {
        const correctAnswers = questions.filter(
            (q) => q.correctAnswer === answers[q._id]
        ).length;
   
        const totalQuestions = questions.length;
        const incorrectAnswers = totalQuestions - correctAnswers;
        const pass = correctAnswers >= 3;
   
        // Ensure all relevant data is passed to the Result page
        navigate('/result', {
            state: {
                pass,
                correctAnswers,
                totalQuestions,
                incorrectAnswers,
                questions,
                answers
            }
        });
    };
   












    // Function to scroll to the selected question
    const scrollToQuestion = (questionId) => {
        const questionElement = document.getElementById(questionId);
        if (questionElement) {
            questionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };




    // Calculate progress as a percentage
    const progressPercentage = (attempted / questions.length) * 100;




    return (
        <div className="wrapper">
            <div className="header">Quiz</div>
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="dropdown-container">
                <select
                    onChange={(e) => scrollToQuestion(e.target.value)}
                    className="dropdown"
                >
                    <option value="" disabled selected>Select a question</option>
                    {questions.map((q, index) => (
                        <option key={q._id} value={q._id}>
                            Question {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="quiz-container">
                {questions.map((q, index) => (
                    <div key={q._id} className="question-container" id={q._id}>
                        <div className="question-box">
                            <div className="question-number-bar">
                                Question {index + 1}
                            </div>
                            <div className="question-text">
                                {q.question || "Loading..."}
                            </div>
                        </div>
                        <div className="options-box">
                            <div className="options">
                                {q.options.map((option, idx) => (
                                    <label
                                        key={idx}
                                        className={answers[q._id] === option ? 'selected' : ''}
                                    >
                                        <input
                                            type="radio"
                                            name={q._id}
                                            value={option}
                                            onChange={(e) => handleChange(e, q._id)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={handleSubmit} className="submit-button">
                    Submit
                </button>
            </div>
        </div>
    );
};




export default Quiz;


