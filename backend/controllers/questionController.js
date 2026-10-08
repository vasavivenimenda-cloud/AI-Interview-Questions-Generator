const questionService = require('../services/questionService');
const { HTTP_STATUS } = require('../utils/constants');

/**
 * Controller for retrieving questions
 */
const getQuestions = async (req, res, next) => {
  try {
    const { role, difficulty, category, limit } = req.query;
    const questions = await questionService.getAllQuestions({
      role,
      difficulty,
      category,
      limit,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for getting a single question by id
 */
const getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);

    if (!question) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: `Question with id ${id} not found`,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for creating/generating a new question
 */
const createQuestion = async (req, res, next) => {
  try {
    const { role, experience_level, question, tech_stack, difficulty, category, sample_answer } = req.body;

    if (!role || !experience_level || !question) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Role, experience_level, and question are required fields.',
      });
    }

    const created = await questionService.createQuestion({
      role,
      experience_level,
      tech_stack,
      question,
      difficulty,
      category,
      sample_answer,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Question created successfully',
      data: created,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle favorite
 */
const toggleFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await questionService.toggleFavorite(id);

    if (!updated) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: `Question with id ${id} not found`,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete question
 */
const deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await questionService.deleteQuestion(id);

    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: `Question with id ${id} not found`,
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  toggleFavorite,
  deleteQuestion,
};
