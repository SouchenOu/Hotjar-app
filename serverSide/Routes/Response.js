import express from 'express';
import {
  deleteResponse,
  getResponseSurvey,
  numberResponses,
  saveResponse,
} from '../Controllers/Response.js';

const router = express.Router();

router.post('/saveResponse', saveResponse);
router.post('/responseSurvey/:id', getResponseSurvey);
router.post('/numberResponses/:id', numberResponses);
router.post('/deleteResponse/:id', deleteResponse);

export default router;
