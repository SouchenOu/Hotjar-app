import express from 'express';
import {
  ChangePassword,
  ForgotPassword,
  register,
  resetLaPassword,
  resetPassword,
  sendVerificationCode,
  verifyCodeAndUpdateEmail,
} from '../Controllers/Auth.js';
import { login } from '../Controllers/Auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is auth');
});

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', ForgotPassword);
router.get('/reset-password/:id/:token', resetPassword);
router.post('/reset-password/:id/:token', resetLaPassword);
router.post('/sendVerificationCode', sendVerificationCode);
router.post('/verifyCodeAndUpdateEmail', verifyCodeAndUpdateEmail);
router.post('/ChangePassword/:id', ChangePassword);

export default router;
