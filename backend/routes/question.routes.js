const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  toggleFavorite,
  deleteQuestion,
} = require('../controllers/questionController');

// GET /api/questions - List all questions
router.get('/', getQuestions);

// GET /api/questions/:id - Single question
router.get('/:id', getQuestionById);

// POST /api/questions - Add / Generate question
router.post('/', createQuestion);

// PATCH /api/questions/:id/favorite - Toggle favorite
router.patch('/:id/favorite', toggleFavorite);

// DELETE /api/questions/:id - Delete question
router.delete('/:id', deleteQuestion);

module.exports = router;
