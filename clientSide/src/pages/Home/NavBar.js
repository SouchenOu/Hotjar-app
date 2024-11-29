import {
  faBars,
  faBell,
  faCheck,
  faChevronDown,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../../context/StateContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import Notification from '../Navbar/Notification';
import { Menu } from './Menu';
import { InviteSite } from './InviteSite';

const NavBar = () => {
  const navigate = useNavigate();
  const [LanguageVisible, setLanguageVisible] = useState(false);
  const [{ userInfo }] = useStateProvider();
  const [sites, setSites] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [openNotfication, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [sitesVisible, setSitesVisible] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
      transports: ['websocket', 'polling'],
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const fetchNotifications = async () => {
    if (!userInfo?._id) return;

    try {
      const result = await axios.get(
        `https://hotjar-app.onrender.com/notification/getNotification/${userInfo._id}`
      );
      setNotifications(result.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const openNotif = async () => {
    setOpenNotification(!openNotfication);
    if (userInfo && userInfo?._id) {
      try {
        await axios.get(
          `https://hotjar-app.onrender.com/notification/marknotifRead/${userInfo?._id}`
        );
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleLogout = async () => {
    await logout();
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSites = async () => {
    try {
      const result = await axios.post(
        `https://hotjar-app.onrender.com/site/getSites/${userInfo._id}`
      );
      setSites(result.data);
      setSitesVisible(!sitesVisible);
      setMenuVisible(false);
      setIsModalOpen(!sitesVisible);
    } catch (err) {
      console.error('Error handling get sites:', err);
    }
  };

  const handleSendInvite = async (site) => {
    try {
      const result = await axios.post(
        `https://hotjar-app.onrender.com/site/sendInvite/${site.id}/${userInfo._id}/${site.created._id}`
      );
      if (result.status === 200) {
        toast.success('request send successfully');
        const msg = `${userInfo.username} has requested to join ${site.name}`;
        await axios.post(
          `https://hotjar-app.onrender.com/notification/createNotif`,
          {
            recipientId: site.created._id,
            senderId: userInfo._id,
            message: msg,
          }
        );
        socket.emit('sendInvite', {
          recipientId: site.created._id,
          message: `${userInfo.username} has requested to join ${site.name}`,
        });
      }
    } catch (err) {
      console.error('Error handling send request:', err);
      toast.error(err.response.data.message);
    }
  };
  const navigateToProfile = () => {
    if (userInfo?._id) {
      navigate(`/profile/${userInfo._id}`);
    }
  };
  const handleSurveys = async () => {
    try {
      const checkRes = await axios.get(
        `https://hotjar-app.onrender.com/site/checkSites/${userInfo._id}`
      );
      const { hasSites } = checkRes.data;

      if (!hasSites) {
        navigate('/site');
      } else {
        const lastSiteRes = await axios.get(
          `https://hotjar-app.onrender.com/site/lastSite/${userInfo._id}`
        );
        const lastSite = lastSiteRes.data;
        navigate(`/site/${lastSite.siteId}/surveys`);
      }
    } catch (error) {
      console.error('Error handling get started:', error);
    }
  };
  useEffect(() => {
    if (userInfo && userInfo._id) {
      fetchNotifications();
    }
  },[userInfo,userInfo?._id]);

  useEffect(() => {
    if (!userInfo?._id) return;

    const socket = io(`https://hotjar-app.onrender.com`, {
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      socket.emit('registerUser', userInfo?._id);
    });
    socket.on('disconnect', (reason) => {});

    socket.on('inviteNotification', async () => {
      const Result = await axios.get(
        `https://hotjar-app.onrender.com/notification/getNotification/${userInfo._id}`
      );
      setNotifications(Result.data.notifications);
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo,userInfo?._id]);

  useEffect(() => {
    if (!userInfo) return;
    const unreadNotif = async () => {
      try {
        const result = await axios.get(
          `https://hotjar-app.onrender.com/notification/getUnreadNotif/${userInfo._id}`
        );
        setUnreadCount(result.data.unreadCount);
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    const intervalId = setInterval(unreadNotif, 1000);

    return () => clearInterval(intervalId);
  }, [userInfo, userInfo?._id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  return (
    <div className="w-full flex items-center justify-between p-4  bg-white shadow-md fixed top-0 z-10">
      <div className="flex items-start">
        <ToastContainer />
        <img
          src="/avito-logo.png"
          alt=""
          className="w-[17px] h-[17px] 2xl:w-[40px] 2xl:h-[40px] md:w-[20px] md:h-[20px] sm:w-[30px] sm:h-[30px] lg:h-[20px] lg:w-[20px]"
        />
        <div className="flex flex-col ">
          <div className="flex ">
            <img
              alt=""
              src="/Hotjar.png"
              className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] lg:w-[20px] lg:h-[20px] 2xl:w-[20px] 2xl:h-[20px]"
            />
            <h1 className="2xl:text-[17px]  text-gray-800  font-bold font-ubuntu">
              Avito surveys
            </h1>
          </div>
          <img
            alt=""
            src="/back2.png"
            className="2xl:w-[200px] 2xl:h-[30px] h-[20px] "
          />
        </div>
      </div>
      <div className="flex items-center gap-[80px] mr-[60px]">
        <div className=" flex items-center gap-[20px]">
          {userInfo && (
            <div className="flex items-center justify-center gap-[20px]">
              <div className="relative mt-[6px] ">
                <FontAwesomeIcon
                  icon={faBell}
                  className="2xl:w-[18px] 2xl:h-[18px] sm:w-[18px] sm:h-[18px] text-blue-900 cursor-pointer"
                  onClick={openNotif}
                />
                {unreadCount > 0 && (
                  <span className="absolute  bottom-[20px] right-0 bg-red-500 text-white rounded-full w-4 h-4  flex items-center justify-center text-[10px]">
                    {unreadCount}
                  </span>
                )}
                {openNotfication && (
                  <Notification
                    notifications={notifications}
                    setNotifications={setNotifications}
                    setOpenNotification={setOpenNotification}
                  />
                )}
              </div>
              <FontAwesomeIcon
                icon={faBars}
                className="2xl:w-[18px] 2xl:h-[18px] sm:w-[18px] sm:h-[18px] cursor-pointer text-blue-900"
                onClick={() => setMenuVisible(!menuVisible)}
              />
            </div>
          )}

          {menuVisible && (
            <Menu
              handleSites={handleSites}
              handleSurveys={handleSurveys}
              navigateToProfile={navigateToProfile}
            />
          )}
          {sitesVisible && (
            <InviteSite
              sites={sites}
              setSitesVisible={setSitesVisible}
              handleSendInvite={handleSendInvite}
            />
          )}
          {isAuthenticated && (
            <button
              className="text-[16px] items-center border-[2px] text-white font-medium font-ubuntu rounded-xl  bg-[#0D19A3] border-[#0D19A3] px-[20px] py-[6px]  w-[130px]  hover:bg-blue-950 hover:text-white"
              onClick={handleLogout}
            >
              SignOut
            </button>
          )}
          {!isAuthenticated && (
            <button
              className="text-[16px] items-center border-[2px] text-white font-medium font-ubuntu rounded-xl  bg-[#0D19A3] border-[#0D19A3] px-[20px] py-[6px]  w-[130px] hover:bg-blue-950 hover:text-white"
              onClick={handleSignIn}
            >
              SignIn
            </button>
          )}
          <div className="relative ml-auto hidden md:flex">
            <div
              className="flex items-center gap-[20px] rounded-lg p-[3px] px-[20px] border-[0.5px] border-solid border-[lightgray] cursor-pointer"
              onClick={() => setLanguageVisible(!LanguageVisible)}
            >
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-[18px]"
                style={{ color: '#0D19A3' }}
              />
              <span className="text-[17px] font-ubuntu font-medium">
                English
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="text-[18px]" />
            </div>
            {LanguageVisible && (
              <div className="absolute top-full right-0 mt-[5px] hover:bg-gray-200 w-[180px] bg-white border-[0.5px] border-solid border-[lightgray] shadow-lg z-10">
                <ul className="flex items-center justify-center gap-[20px] list-none p-0 m-0">
                  <li className="p-[5px] cursor-pointer text-[15px] font-rubik">
                    English
                  </li>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className=" text-green-800 relative w-[20px] h-[20px]"
                  />
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
