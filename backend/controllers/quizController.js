const Question = require('../models/Question');
const csv = require('csv-parser');
const fs = require('fs');

const loadQuestions = () => {
    const questions = [];
    fs.createReadStream('data/compProgH.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.question && row.option1 && row.option2 && row.option3 && row.option4 && row.correctAnswer) {
                questions.push({
                    question: row.question,
                    options: [row.option1, row.option2, row.option3, row.option4],
                    correctAnswer: row.correctAnswer,
                });
            }
        })
        .on('end', async () => {
            try {
                await Question.deleteMany({}); // Clear existing questions
                await Question.insertMany(questions); // Insert new questions
                console.log('CSV file successfully processed and questions inserted');
            } catch (err) {
                console.log('Error inserting questions:', err);
            }
        });
};

const getQuizQuestions = async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { loadQuestions, getQuizQuestions };
