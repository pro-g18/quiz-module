const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quiz');
const { loadQuestions } = require('./controllers/quizController');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

loadQuestions(); // Load questions into MongoDB from CSV file

app.use('/api', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
