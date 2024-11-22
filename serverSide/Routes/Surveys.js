import express from 'express';
import {
  SearchSurvey,
  createSurveys,
  deleteSurvey,
  getAllSurveysBySite,
  getSurveyData,
  updateStatus,
  updateSurvey,
} from '../Controllers/Surveys.js';
import { getSurveyById } from '../Controllers/Surveys.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
__dirname;
const router = express.Router();
// Set up multer storage

cloudinary.config({
  cloud_name: 'dvxc2husm', 
  api_key: '282365854686145', 
  api_secret: 'DDLEfKt4W4LBuuzExyuqxkwzMa0',
});

// Set up multer storage (local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/updateLogo', upload.single('logo'), async (req, res) => {
  try {
    console.log("yes", req.file);
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }


    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        return res.status(500).send({ error: 'Error uploading to Cloudinary' });
      }

      const logoUrl = result.secure_url;


      // res.send({ logoUrl });
      console.log("result-->", result);
      console.log("logoUrl-->", logoUrl);
      res.send({ logoUrl: logoUrl });

    });
  } catch (error) {
    console.error('Error saving the logo URL', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.get('/uploads', (req, res) => {
  const uploadsPath = path.join(__dirname, 'uploads');
  
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      console.error('Error reading uploads folder:', err);
      return res.status(500).send({ error: 'Unable to read uploads folder' });
    }
    res.send({ files });
  });
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
