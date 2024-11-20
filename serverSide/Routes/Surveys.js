import express from 'express';
import {
  SearchSurvey,
  createSurveys,
  deleteSurvey,
  getAllSurveysBySite,
  getSurveyData,
  updateLogo,
  updateStatus,
  updateSurvey,
} from '../Controllers/Surveys.js';
import { getSurveyById } from '../Controllers/Surveys.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
__dirname;
const router = express.Router();
// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
router.post('/updateLogo', upload.single('logo'), updateLogo);
router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

router.post('/:siteId', createSurveys);
router.get('/getSurveys/:siteId/:userId', getAllSurveysBySite);
router.get('/search/:id', SearchSurvey);
router.delete('/delete/:id', deleteSurvey);
router.put('/update/:id', updateSurvey);
router.post('/updateStatus/:id', updateStatus);
router.get('/getSurveyData/:siteId', getSurveyData);
router.get('/getSurvey/:id', getSurveyById);

export default router;
