import React, { useEffect, useState } from 'react';
import SideBarLeft from '../SideBar/SideBarLeft';
import NavBar from './NavBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateProvider } from '../../context/StateContext';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const NotAllowed = () => {
  const [{ userInfo }] = useStateProvider();
  const [site, setSite] = useState('');
  const socket = io('https://pro1-ubq1.onrender.com', {
    transports: ['websocket', 'polling'],
  });
  const { id } = useParams();
  useEffect(() => {
    const getSite = async () => {
      try {
        const res = await axios.get(`https://pro1-ubq1.onrender.com/site/getSite/${id}`);
        setSite(res.data);
      } catch (err) {
        console.log('err', err);
      }
    };
    getSite();
  }, [id]);
  const handleSendInvite = async () => {
    try {
      const result = await axios.post(
        `https://pro1-ubq1.onrender.com/site/sendInvite/${site._id}/${userInfo._id}/${site.user}`
      );
      if (result.status === 200) {
        toast.success('request send successfully');
        const msg = `${userInfo.username} has requested to join ${site.name}`;
        await axios.post('https://pro1-ubq1.onrender.com/notification/createNotif', {
          recipientId: site.user,
          senderId: userInfo._id,
          message: msg,
        });
        socket.emit('sendInvite', {
          recipientId: site.user,
          message: `${userInfo.username} has requested to join ${site.name}`,
        });
      }
    } catch (err) {
      console.error('Error handling send request:', err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="absolute flex h-screen bg-gray-100 w-full">
      <SideBarLeft />
      <div className="flex-1 flex flex-col ">
        <ToastContainer />
        <NavBar />
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-xl m-[80px] text-center max-w-2xl mx-auto">
          <h1 className="text-[20px] font-extrabold text-red-600 mb-4">
            Access Denied!
          </h1>
          <p className="text-[14px] text-gray-700 mb-6">
            You do not have permission to view this page. Please contact the
            administrator or switch accounts to gain access.
          </p>
          <button
            className="bg-red-500 font-semibold text-[13px] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            onClick={handleSendInvite}
          >
            Request Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;
