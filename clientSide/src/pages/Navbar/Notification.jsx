import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PropTypes from 'prop-types';

const Notification = ({
  notifications,
  setNotifications,
  setOpenNotification,
}) => {
  const getFirstLetter = (name) => name.charAt(0).toUpperCase();

  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const deleteNotif = async (id) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/notification/deleteNotification/${id}`
      );

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif._id !== id)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const filteredNotifications = notifications.filter(
    (notif) => notif.senderId !== null
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end scrollbar-hidden"
      onClick={() => setOpenNotification(false)}
    >
      <div
        className="2xl:w-[500px] w-[400px] max-h-[80vh] bg-white border border-gray-200 rounded-2xl shadow-xl mt-16 2xl:mr-8 mr-[340px] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-orange-600 to-orange-400 rounded-t-2xl">
          <h3 className="text-[15px] font-bold text-white">Notifications</h3>
          <FontAwesomeIcon
            icon={faClose}
            className="text-white cursor-pointer hover:text-red-400 transition duration-300"
            onClick={() => setOpenNotification(false)}
          />
        </div>

        <div className="max-h-[calc(100vh-20rem)] overflow-auto overflow-thin">
          <ul className="list-none p-4 space-y-4">
            {filteredNotifications.length === 0 ? (
              <li className="p-4 text-center text-[14px] text-gray-500">
                No notifications
              </li>
            ) : (
              filteredNotifications.map((notif) => (
                <li
                  key={notif._id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r p-4 from-orange-500 to-orange-300 text-white flex items-center justify-center rounded-full text-[14px] font-semibold">
                      {getFirstLetter(notif.senderId.username)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[12px] text-gray-800">
                        {notif.message}
                      </span>
                      <span className="text-gray-500 text-[12px]">
                        {moment(notif.timestamp).fromNow(currentTime)}
                      </span>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faClose}
                    className="text-red-600 hover:text-red-400 cursor-pointer transition-all duration-300"
                    onClick={() => deleteNotif(notif._id)}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      senderId: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }),
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  setNotifications: PropTypes.func.isRequired,
  setOpenNotification: PropTypes.func.isRequired,
};

export default Notification;
