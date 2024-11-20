import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getotherUsers,
  searchByEmail,
  updateUser,
} from '../Controllers/User.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/searchByEmail', searchByEmail);
router.get('/:id', getUserById);
router.put('/updateUser/:id', updateUser);
router.get('/deleteUser/:id', deleteUser);
router.get('/getUserEmail/:email', getUserByEmail);
router.get('/getUsers/:id', getotherUsers);

export default router;
