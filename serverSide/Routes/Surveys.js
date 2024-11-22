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

// router.post('/updateLogo', upload.single('logo'), updateLogo);
router.post('/updateLogo', upload.single('logo'), async (req, res) => {
  console.log("enter here-->", req.file);
  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'survey_logos', // Store in a specific folder
      public_id: req.body.public_id, // Use a custom public ID if desired
    });

    // Respond with the image URL from Cloudinary
    res.json({
      message: 'Logo uploaded successfully',
      imageUrl: uploadResult.secure_url, // Cloudinary URL of the uploaded image
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading logo', error });
  }
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
