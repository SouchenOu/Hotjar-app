import {
  faAddressCard,
  faBars,
  faBell,
  faChevronDown,
  faGear,
  faList,
  faMagnifyingGlass,
  faPeopleGroup,
  faPlus,
  faRightFromBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState, React } from 'react';
import { useStateProvider } from '../../context/StateContext';
import { useAuth } from '../../context/AuthenticationContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import Notification from './Notification';
import ToolTip from './ToolTip';

const NavBar = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [{ userInfo }] = useStateProvider();
  const [selectedSite, setSelectedSite] = useState('Survey Demo site');
  const [profileVisible, setProfileVisible] = useState(false);
  const [websites, setWebsites] = useState([]);
  const [filterWebsite, setFilterWebsite] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [openNotfication, setOpenNotification] = useState(false);
  const [memberWebsites, setMemberWebsites] = useState([]);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (userInfo && userInfo?._id) {
      fetchNotifications();
    }
  }, []);
  const fetchNotifications = async () => {
    if (!userInfo?._id) return;

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/notification/getNotification/${userInfo._id}`
      );
      setNotifications(result.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  useEffect(() => {
    if (!userInfo?._id) return;

    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      socket.emit('registerUser', userInfo?._id);
    });
    socket.on('inviteNotification', async () => {
      const Result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/notification/getNotification/${userInfo._id}`
      );
      setNotifications(Result.data.notifications);
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo?._id]);
  useEffect(() => {
    if (!userInfo) return;
    const unreadNotif = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/notification/getUnreadNotif/${userInfo._id}`
        );
        setUnreadCount(result.data.unreadCount);
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    const intervalId = setInterval(unreadNotif, 1000);

    return () => clearInterval(intervalId);
  }, [userInfo?._id]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setNotifications([]);
    navigate('/');
  };

  const getFirstThreeCharacters = (name) => {
    return name.substring(0, 1).toUpperCase();
  };

  const navigateToProfile = () => {
    if (userInfo?._id) {
      navigate(`/profile/${userInfo._id}`);
    }
  };

  const AllWebsite = async () => {
    if (!userInfo?._id) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/site/GetUserSites/${userInfo._id}`
      );
      const { createdSites, memberSites } = response.data.sites;

      if (Array.isArray(createdSites)) {
        setWebsites(createdSites);
        setFilterWebsite(createdSites);
      } else {
        console.error('Unexpected format for createdSites:', response);
      }

      if (Array.isArray(memberSites)) {
        setMemberWebsites(memberSites);
      } else {
        console.error('Unexpected format for memberSites:', response);
      }
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
  };

  const handleSelectedSite = (site) => {
    setSelectedSite(site.url);
    navigate(`/site/${site._id}/surveys`);
  };

  const navigateAllSite = () => {
    navigate('/sites');
  };

  const searchByUrl = async (url) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/site/searchSite/${userInfo._id}`,
        { url }
      );
      if (result.data.createdSites) {
        setFilterWebsite(result.data.createdSites);
      } else {
        setFilterWebsite([]);
      }
      if (result.data.memberSites) {
        setMemberWebsites(result.data.memberSites);
      } else {
        setMemberWebsites([]);
      }
    } catch (error) {
      console.error('Error searching sites:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      searchByUrl(value);
    } else {
      setFilterWebsite(websites);
    }
  };

  useEffect(() => {
    if (websites.length > 0) {
      setSelectedSite(websites[0].url);
    } else if (memberWebsites.length > 0) {
      setSelectedSite(memberWebsites[0].url);
    }
  }, [websites]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      AllWebsite();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userInfo?._id]);

  const navigateToTeam = () => {
    navigate(`/site/${id}/team/list`);
  };

  const openNotif = async () => {
    setOpenNotification(!openNotfication);
    if (userInfo && userInfo?._id) {
      try {
        await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/notification/marknotifRead/${userInfo?._id}`
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200">
      <div className="flex flex-col lg:flex-row items-center gap-[20px]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/Hotjar.png" alt="Hotjar Logo" className="w-6 h-6" />
            <span className="text-gray-800 lg:text-sm text-[10px] font-semibold">
              Avito Surveys
            </span>
          </div>
          <img src="/back2.png" alt="Back to Site" className="lg:w-30 h-6" />
        </div>

        <div className="flex items-center gap-[10px]">
          <div className="relative">
            <div
              className="flex items-center justify-between  lg:px-[50px] py-2 lg:w-[500px] w-[200px]  px-1 border border-gray-300 rounded-lg cursor-pointer"
              onClick={() => setMenuVisible(!menuVisible)}
            >
              <span className="text-gray-700 lg:text-[12px] text-[10px] font-medium truncate">
                {selectedSite}
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="lg:text-lg text-[10px]"
                style={{ color: '#0D19A3' }}
              />
            </div>
            {menuVisible && (
              <div
                className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-lg z-10"
                ref={menuRef}
              >
                <div className="p-3 flex flex-col gap-4">
                  <div className="relative flex items-center w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                    <input
                      type="text"
                      placeholder="Find a site or organization"
                      className="w-full lg:px-4 py-3 lg:text-sm text-[10px] px-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-transparent rounded-lg"
                      value={searchValue}
                      onChange={handleInputChange}
                    />
                    <button className="absolute right-3 flex items-center justify-center lg:w-7 lg:h-7 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="text-white lg:text-sm text-[10px] sm:block hidden"
                      />
                    </button>
                  </div>
                  <ul className="list-none p-0 m-0 text-gray-800 lg:text-[14px] text-[10px] h-[300px] overflow-auto scrollbar-thin">
                    <li className="lg:font-semibold text-blue-500 py-2">
                      Created Sites
                    </li>
                    {filterWebsite.length > 0 ? (
                      filterWebsite.map((site, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100  text-gray-800 rounded-lg cursor-pointer"
                          onClick={() => handleSelectedSite(site)}
                        >
                          {site.url}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500 italic">
                        No created sites found.
                      </li>
                    )}

                    <li className="font-semibold text-blue-500 py-4">
                      Member Sites
                    </li>
                    {memberWebsites.length > 0 ? (
                      memberWebsites.map((site, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                          onClick={() => handleSelectedSite(site)}
                        >
                          {site.url}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500 italic">
                        No member sites found.
                      </li>
                    )}
                  </ul>
                  <div
                    className="flex items-center gap-4 p-4 bg-white shadow-md border rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-lg transition duration-300"
                    onClick={() => navigate('/site')}
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-blue-600 text-sm"
                      />
                    </div>
                    <span className="text-gray-800 lg:font-medium  text-[13px]">
                      Add New Site
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-4 p-4 bg-white shadow-md border rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-lg transition duration-300"
                    onClick={navigateAllSite}
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                      <FontAwesomeIcon
                        icon={faList}
                        className="text-blue-600 text-sm"
                      />
                    </div>
                    <span className="text-gray-800 lg:font-medium  text-[13px]">
                      List Sites
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="lg:hidden">
            <FontAwesomeIcon
              icon={faBars}
              className="w-[14px] h-[14px] text-orange-700"
              onClick={() => setOpenBar(!openBar)}
            />
            {openBar && (
              <div className="absolute top-[100px] left-[100px] bg-white border border-gray-300 shadow-lg rounded-lg w-[200px] z-50">
                <div className="flex flex-col gap-4 p-4">
                  <div
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg cursor-pointer"
                    onClick={navigateToTeam}
                  >
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      className="text-[14px] text-gray-500"
                    />
                    <h1 className="text-[14px] font-medium">Team Members</h1>
                  </div>

                  <div
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg cursor-pointer"
                    onClick={navigateToProfile}
                  >
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className="text-[14px] text-gray-500"
                    />
                    <h1 className="text-[14px] font-medium">Profile</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:flex hidden items-center gap-6">
        <ToolTip text="Team Members">
          <FontAwesomeIcon
            icon={faPeopleGroup}
            className="text-[20px] cursor-pointer  hover:text-orange-900  text-orange-700"
            onClick={navigateToTeam}
          />
        </ToolTip>
        <ToolTip text="Notifcations">
          <div className="relative ">
            <FontAwesomeIcon
              icon={faBell}
              className="hover:text-orange-900 text-[17px] cursor-pointer text-orange-700"
              onClick={openNotif}
            />
            {unreadCount > 0 && (
              <span className="absolute bottom-[20px] right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
        </ToolTip>

        {isAuthenticated && (
          <div className="relative">
            <div
              className="w-8 h-8 bg-orange-700 text-white font-bold flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 transition duration-300"
              onClick={() => setProfileVisible(!profileVisible)}
            >
              {getFirstThreeCharacters(userInfo.username)}
            </div>

            {profileVisible && (
              <div
                className="absolute top-full right-0 mt-2 w-60 bg-white border border-gray-300 shadow-lg rounded-lg z-10 transition duration-300 transform origin-top-right"
                ref={profileMenuRef}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center bg-gray-100 py-6 rounded-t-lg">
                    <div className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full text-[17px]">
                      {getFirstThreeCharacters(userInfo.username)}
                    </div>
                    <span className="text-[14px] text-gray-700 font-bold mt-2">
                      {userInfo.username}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      {userInfo.email}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg cursor-pointer transition duration-300"
                      onClick={navigateToProfile}
                    >
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="text-md text-gray-500"
                      />
                      <h1 className="text-[14px] font-medium">Profile</h1>
                    </div>

                    <div
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg cursor-pointer transition duration-300"
                      onClick={navigateAllSite}
                    >
                      <FontAwesomeIcon
                        icon={faGear}
                        className="text-md text-gray-500"
                      />
                      <h1 className="text-[14px] font-medium">
                        Organization Sites
                      </h1>
                    </div>

                    <div
                      className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg cursor-pointer transition duration-300"
                      onClick={navigateToTeam}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="text-md text-gray-500"
                      />
                      <h1 className="text-[14px] font-medium">
                        Invite Members
                      </h1>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center gap-3 text-red-600 hover:bg-red-100 py-2 px-4 rounded-b-lg cursor-pointer transition duration-300"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="text-[15px]"
                    />
                    <h1 className="text-[15px] font-medium">Sign Out</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
