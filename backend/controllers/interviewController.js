import * as dbService from '../services/dbService.js';
import * as aiService from '../services/aiService.js';

export const getInterviews = (req, res) => {
  try {
    const list = dbService.getInterviews();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch interview history', error: err.message });
  }
};

export const getInterviewById = (req, res) => {
  try {
    const interview = dbService.getInterviewById(req.params.id);
    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }
    res.json({ success: true, data: interview });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch interview session', error: err.message });
  }
};

export const evaluateSingleAnswer = async (req, res) => {
  try {
    const {
      question,
      userAnswer,
      expectedAnswer,
      keyPoints,
      category,
      difficulty,
      codingDetails
    } = req.body;

    if (!question) {
      return res.status(400).json({ success: false, message: 'Question text is required' });
    }

    const evaluation = await aiService.evaluateAnswer({
      question,
      userAnswer: userAnswer || '',
      expectedAnswer: expectedAnswer || '',
      keyPoints: keyPoints || [],
      category: category || 'Technical',
      difficulty: difficulty || 'Medium',
      codingDetails: codingDetails || null
    });

    res.json({ success: true, data: evaluation });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to evaluate answer', error: err.message });
  }
};

export const createInterview = (req, res) => {
  try {
    const sessionData = req.body;
    
    // If scores/report not precomputed, compute using AI service
    if (!sessionData.overallScore && sessionData.questions) {
      const report = aiService.generateReport(sessionData);
      Object.assign(sessionData, report);
    }

    const saved = dbService.saveInterview(sessionData);
    res.json({
      success: true,
      message: 'Interview session saved successfully',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save interview session', error: err.message });
  }
};

export const deleteInterview = (req, res) => {
  try {
    const deleted = dbService.deleteInterview(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }
    res.json({ success: true, message: 'Interview session deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete interview', error: err.message });
  }
};
