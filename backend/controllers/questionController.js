import * as dbService from '../services/dbService.js';
import * as aiService from '../services/aiService.js';

export const getQuestions = (req, res) => {
  try {
    const { search, category, difficulty, jobRole, programmingLanguage, favoriteOnly } = req.query;
    const questions = dbService.getQuestions({
      search,
      category,
      difficulty,
      jobRole,
      programmingLanguage,
      favoriteOnly
    });
    res.json({ success: true, count: questions.length, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch questions', error: err.message });
  }
};

export const getQuestionById = (req, res) => {
  try {
    const question = dbService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch question', error: err.message });
  }
};

export const generateQuestions = async (req, res) => {
  try {
    const {
      jobRole,
      skills,
      experience,
      interviewType,
      difficulty,
      programmingLanguage,
      count
    } = req.body;

    // Fall back to profile defaults if missing
    const profile = dbService.getProfile();
    const params = {
      jobRole: jobRole || profile.targetRole || 'Full Stack Developer',
      skills: skills || profile.skills || 'JavaScript, React, Node.js',
      experience: experience || profile.experience || 'Fresher',
      interviewType: interviewType || profile.preferredInterviewType || 'Technical Interview',
      difficulty: difficulty || 'Medium',
      programmingLanguage: programmingLanguage || profile.programmingLanguage || 'JavaScript',
      count: Number(count) || 5
    };

    const generated = await aiService.generateQuestions(params);
    // Save to bank so user can search & practice
    const saved = dbService.addQuestions(generated);

    res.json({
      success: true,
      message: `Generated ${saved.length} questions successfully`,
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate questions', error: err.message });
  }
};

export const toggleFavorite = (req, res) => {
  try {
    const updated = dbService.toggleFavoriteQuestion(req.params.id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to toggle favorite', error: err.message });
  }
};

export const deleteQuestion = (req, res) => {
  try {
    const deleted = dbService.deleteQuestion(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete question', error: err.message });
  }
};
