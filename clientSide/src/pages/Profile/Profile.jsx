import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEnvelope,
  faLock,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import NavBarSign from '../Navbar/NavBarSign';
import { useAuth } from '../../context/AuthenticationContext';
import { useStateProvider } from '../../context/StateContext';
import SideBarLeft from '../SideBar/SideBarLeft';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [{ userInfo }] = useStateProvider();
  const [isChanged, setIsChanged] = useState(false);
  const [, dispatch] = useStateProvider();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [currentForm, setCurrentForm] = useState('profile');
  const [initialUserInfo, setInitialUserInfo] = useState({
    username: userInfo.username,
    role: userInfo.role,
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const updatedUserInfo = { ...userInfo, [e.target.name]: e.target.value };
    dispatch({ type: 'SET_USER_INFO', userInfo: updatedUserInfo });

    const isChanged =
      updatedUserInfo.username !== initialUserInfo.username ||
      updatedUserInfo.role !== initialUserInfo.role;
    setIsChanged(isChanged);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedUserInfo = {
      username: userInfo.username,
      role: userInfo.role,
    };

    try {
      await axios.put(
        `https://pro1-ubq1.onrender.com/user/updateUser/${id}`,
        updatedUserInfo
      );
      const newUserInfo = {
        ...userInfo,
        username: updatedUserInfo.username,
        role: updatedUserInfo.role,
      };
      dispatch({ type: 'SET_USER_INFO', userInfo: newUserInfo });

      const storedData = JSON.parse(localStorage.getItem('user_data'));
      if (storedData) {
        storedData.user = newUserInfo;
        localStorage.setItem('user_data', JSON.stringify(storedData));
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.get(`https://pro1-ubq1.onrender.com/user/deleteUser/${id}`);
      handleLogout();
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error deleting account. Please try again.');
    }
  };

  const confirmDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    deleteAccount();
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const navigateToSurveys = async () => {
    const lastSiteRes = await axios.get(
      `https://pro1-ubq1.onrender.com/site/lastSite/${id}`
    );
    const lastSite = lastSiteRes.data;
    navigate(`/site/${lastSite.siteId}/surveys`);
  };

  const handleChangeEmail = () => {
    setCurrentForm('email');
  };

  const navigateToPassword = () => {
    setCurrentForm('password');
  };

  const renderForm = () => {
    if (currentForm === 'profile') {
      return (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 lg:mr-[10px] mr-[10px] flex flex-col gap-8 rounded-lg shadow-xl lg:w-[500px] w-[300px]  "
        >
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-[14px] font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border text-[14px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-[14px] font-semibold mb-2">
                Email Address
              </label>
              <div className="w-full bg-gray-100 px-3 py-2 border text-[14px] border-gray-300 rounded-lg">
                {userInfo.email}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!isChanged || isLoading}
                className={`flex-1 ${isChanged ? 'bg-blue-500' : 'bg-gray-300'} ${isLoading ? 'cursor-not-allowed' : ''} text-white py-2 rounded-lg text-[15px] font-semibold transition duration-300`}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      );
    } else if (currentForm === 'email') {
      return <ChangeEmail setCurrentForm={setCurrentForm} />;
    } else if (currentForm === 'password') {
      return <ChangePassword setCurrentForm={setCurrentForm} />;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      <SideBarLeft />
      <div className="flex-1 overflow-hidden">
        <NavBarSign />
        <div className="container lg:w-[1000px] flex flex-col gap-6 lg:mx-auto lg:p-[20px] p-[20px] bg-white shadow-lg rounded-lg">
          <div className="flex items-center gap-4 mb-6 cursor-pointer">
            <div
              className="flex items-center text-blue-600 hover:text-blue-800"
              onClick={navigateToSurveys}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
              <span className="ml-2 text-[16px]">Back to all surveys</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-[100px]">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl font-bold lg:mb-4 text-gray-800">
                Account Details
              </h2>
              {renderForm()}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full mt-4">
                <button
                  className="bg-blue-500 text-white w-[150px] flex items-center gap-[10px] p-[10px] rounded-lg text-[13px] font-semibold hover:bg-blue-800 transition duration-300"
                  onClick={navigateToPassword}
                >
                  <FontAwesomeIcon icon={faLock} />
                  Change Password
                </button>
                <button
                  onClick={handleChangeEmail}
                  type="button"
                  className="flex items-center gap-[10px] p-[10px] text-[13px] w-[150px] text-blue-600 border border-blue-800 rounded-lg font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-800 transition duration-300"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  Change Email
                </button>
                <button
                  className="bg-red-500 text-white p-[10px] w-[150px] rounded-lg text-[13px] font-semibold flex items-center gap-2 hover:bg-red-600 transition duration-300"
                  onClick={confirmDelete}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Delete Account
                </button>
              </div>
            </div>
            <img
              src="/pro.png"
              alt="Profile"
              className="w-[200px] h-[200px] rounded-full object-cover lg:block hidden"
            />
          </div>
        </div>
        {showModal && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCancelDelete}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-xl w-[350px]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[15px] text-gray-800 font-semibold text-center mb-4">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-red-500  text-white p-[10px] rounded-lg w-[120px] text-[12px] font-semibold"
                  onClick={handleConfirmDelete}
                >
                  Yes, delete it
                </button>
                <button
                  className="bg-gray-300 text-gray-700 p-[10px] rounded-lg w-[120px] text-[12px] font-semibold"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
