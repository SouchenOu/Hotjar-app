import express from 'express';
import {
  addTemplate,
  getTemplateId,
  getTemplates,
  searchTemplate,
} from '../Controllers/Templates.js';

const router = express.Router();

router.get('/addTemplate', addTemplate);
router.get('/getTemplates', getTemplates);
router.post('/searchTemplate', searchTemplate);
router.post('/getTemplateId/:id', getTemplateId);

export default router;
