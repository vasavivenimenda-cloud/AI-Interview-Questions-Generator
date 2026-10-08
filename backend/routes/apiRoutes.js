import express from 'express';
import * as questionCtrl from '../controllers/questionController.js';
import * as interviewCtrl from '../controllers/interviewController.js';
import * as profileCtrl from '../controllers/profileController.js';
import * as statsCtrl from '../controllers/statsController.js';

const router = express.Router();

// Question Endpoints
router.get('/questions', questionCtrl.getQuestions);
router.get('/questions/:id', questionCtrl.getQuestionById);
router.post('/questions/generate', questionCtrl.generateQuestions);
router.post('/questions/:id/favorite', questionCtrl.toggleFavorite);
router.delete('/questions/:id', questionCtrl.deleteQuestion);

// Interview & Evaluation Endpoints
router.get('/interviews', interviewCtrl.getInterviews);
router.get('/interviews/:id', interviewCtrl.getInterviewById);
router.post('/interviews', interviewCtrl.createInterview);
router.post('/interviews/evaluate', interviewCtrl.evaluateSingleAnswer);
router.delete('/interviews/:id', interviewCtrl.deleteInterview);

// Profile Endpoints
router.get('/profile', profileCtrl.getProfile);
router.put('/profile', profileCtrl.updateProfile);

// Stats & Settings Endpoints
router.get('/stats', statsCtrl.getStats);
router.get('/settings', statsCtrl.getSettings);
router.post('/settings', statsCtrl.updateSettings);
router.post('/settings/test', statsCtrl.testAiConnection);
router.post('/reset-data', statsCtrl.resetDatabase);

export default router;
