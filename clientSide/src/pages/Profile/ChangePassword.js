import { useState, React } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Toast from '../Surveys/data/Toast';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = ({ setCurrentForm }) => {
  const { id } = useParams();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [Loading, setLoading] = useState(false);

  const navigateToProfile = () => {
    setCurrentForm('profile');
  };

  const checkPasswordStrength = (password) => {
    const strongPassword = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const mediumPassword = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );

    if (strongPassword.test(password)) {
      setPasswordStrength('Strong');
    } else if (mediumPassword.test(password)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      setToastMessage('New passwords do not match!');
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(newPassword)) {
      setToastMessage(
        'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      setToastType('failure');
      return;
    }

    try {
      await axios.post(
        `https://pro-1-hk8q.onrender.com/auth/ChangePassword/${id}`,
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        }
      );

      toast.success('Password changed successfully!');
      setToastMessage('Password changed successfully!');
      setToastType('success');
      setCurrentForm('profile');
    } catch (error) {
      toast.error(
        error.response.data.message ||
          'Error changing password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <ToastContainer />

      <div className="flex flex-col  ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white shadow-lg p-5 rounded-lg lg:w-[500px] w-[300px] mx-auto"
        >
          <div className="flex gap-4 text-gray-500 text-lg">
            <h1
              className="hover:text-blue-700 text-[15px] cursor-pointer"
              onClick={navigateToProfile}
            >
              Account & Security
            </h1>
            <span>/</span>
            <h1 className="text-blue-700 text-[15px]">Change Password</h1>
          </div>
          <h1 className="text-[17px] font-bold text-gray-800">
            Change Password
          </h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-gray-600">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  className="border-2 border-gray-300 px-3 py-2 rounded-lg text-[14px] focus:border-blue-500 focus:bg-blue-50 focus:outline-none transition-all duration-300 w-full "
                  placeholder="Please enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                  className="absolute top-3 right-4 text-[13px] text-gray-500 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-gray-600">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="border-2 border-gray-300 px-3 py-2 text-[14px] rounded-lg focus:border-blue-500 focus:bg-blue-50 focus:outline-none transition-all duration-300 w-full "
                  placeholder="Please enter a new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                  }}
                  required
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  className="absolute top-3 right-4 text-gray-500 text-[13px] cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              </div>
              {newPassword && (
                <p
                  className={`flex gap-[20px] text-[13px]  font-semibold ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}
                >
                  Password strength: <p className="">{passwordStrength}</p>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-gray-600">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  className="border-2 border-gray-300 px-3 py-2 text-[14px] rounded-lg focus:border-blue-500 focus:bg-blue-50 focus:outline-none transition-all duration-300 w-full "
                  placeholder="Please re-enter your new password"
                  value={confirmNewPassword}
                  onChange={(e) => setconfirmNewPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showConfirmNewPassword ? faEyeSlash : faEye}
                  className="absolute top-3 right-4 text-gray-500  text-[13px] cursor-pointer"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center lg:ml-[120px] ml-[30px] mt-8 bg-blue-600 text-white px-[80px] py-2 font-bold text-[17px] rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg w-[200px] "
            >
              {!Loading ? 'Save' : 'Changing...'}
            </button>
          </div>
        </form>
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage('')}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
