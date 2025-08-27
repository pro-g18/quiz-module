import axios from 'axios';

export const getQuizQuestions = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/quiz');
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return [];
    }
};
