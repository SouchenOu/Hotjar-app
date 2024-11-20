import express from 'express';
import {
  CreateNotification,
  deleteNotification,
  getNotifications,
  getUnreadNotifications,
  markNotificationsAsRead,
} from '../Controllers/Notification.js';

const router = express.Router();

router.post('/createNotif', CreateNotification);
router.get('/getNotification/:id', getNotifications);
router.get('/deleteNotification/:id', deleteNotification);
router.get('/getUnreadNotif/:id', getUnreadNotifications);
router.get('/marknotifRead/:id', markNotificationsAsRead);

export default router;
