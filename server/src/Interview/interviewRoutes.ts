import express from 'express';
import authenticate from '../middleware/authUser';
import {
  deleteRoadmap,
  fetchContent,
  fetchQuiz,
  fetchQuizById,
  fetchRoadmap,
  fetchRoadmapById,
  generate_content,
  generate_Roadmap,
  generateQuiz,
} from './interviewController';

const aiInterviewerRouter = express.Router();

// Ai Tutor Routes
aiInterviewerRouter.post('/roadmap/:topic', authenticate, generate_Roadmap);
aiInterviewerRouter.get('/roadmap', authenticate, fetchRoadmap);
aiInterviewerRouter.get('/roadmap/:id', authenticate, fetchRoadmapById);
aiInterviewerRouter.delete('/roadmap/:id', authenticate, deleteRoadmap);
aiInterviewerRouter.post('/generatecontent', authenticate, generate_content);
aiInterviewerRouter.get('/getcontent/:id', authenticate, fetchContent);
aiInterviewerRouter.post('/generatequiz/:id', authenticate, generateQuiz);
aiInterviewerRouter.get('/quiz', authenticate, fetchQuiz);
aiInterviewerRouter.get('/quiz/:id', authenticate, fetchQuizById);

export default aiInterviewerRouter;
