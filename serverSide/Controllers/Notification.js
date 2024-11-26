import Notification from '../Modules/Notification.js';
import Users from '../Modules/Users.js';

export const CreateNotification = async (req, res) => {
  try {
    const { recipientId, senderId, message } = req.body;

    if (!recipientId || !senderId || !message) {
      return res.status(401).json({ error: 'all fields are required' });
    }
    const NewNotification = new Notification({
      recipientId,
      senderId,
      message,
    });
    const savedNotifcation = await NewNotification.save();
    return res.status(200).json({ notification: savedNotifcation });
  } catch (err) {
    console.error('Error creating notification:', err);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
  }
};
export const getNotifications = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const notifications = await Notification.find({ recipientId: id })
      .populate('senderId', 'username')
      .populate('recipientId', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (err) {
    console.error('Error getting notifications', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notif = await Notification.findByIdAndDelete(id);
    if (!notif) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    return res
      .status(200)
      .json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the notification' });
  }
};

export const getUnreadNotifications = async (req, res) => {
  const { id } = req.params;

  try {
    const unreadNotifications = await Notification.find({
      recipientId: id,
      isRead: false,
    }).sort({ timestamp: -1 });

    res.status(200).json({
      unreadCount: unreadNotifications.length,
      unreadNotifications,
    });
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    res.status(500).json({ message: 'Failed to fetch unread notifications' });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    await Notification.updateMany(
      { recipientId: id, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ message: 'Failed to mark notifications as read' });
  }
};
