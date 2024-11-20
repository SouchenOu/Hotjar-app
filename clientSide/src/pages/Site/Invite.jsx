import { useNavigate, useParams } from 'react-router-dom';
import NavBarSign from '../Navbar/NavBarSign';
import SideBarLeft from '../SideBar/SideBarLeft';
import axios from 'axios';
import { useEffect, useState, React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPeopleGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useStateProvider } from '../../context/StateContext';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Invite = () => {
  const { id } = useParams();
  const [site, setSite] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // New state for message type
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [Error, setError] = useState(false);
  const [{ userInfo }] = useStateProvider();
  const socket = io('https://pro1-ubq1.onrender.com', {
    transports: ['websocket', 'polling'],
  });

  const handleEmailInput = async (e) => {
    const input = e.target.value;
    setEmail(input);
    if (input.length > 1) {
      try {
        const result = await axios.get(
          `https://pro1-ubq1.onrender.com/user/searchByEmail?email=${input}`
        );
        setSuggestions(result.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const sendInvite = async () => {
    if (!email || !role) {
      setMessage('Please provide both email and role.');
      setMessageType('error'); // Error type
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await axios.post(
        `https://pro1-ubq1.onrender.com/site/invite/${id}/${userInfo._id}`,
        { email, role }
      );

      const user = await axios.get(
        `https://pro1-ubq1.onrender.com/user/getUserEmail/${email}`
      );

      const successMessage =
        result.status === 200
          ? result.data.message
          : `${userInfo.username} changed your role to ${role} in the site ${site.name}`;

      setMessage(successMessage);
      setMessageType('success'); // Success type
      toast.success(successMessage);

      await axios.post('https://pro1-ubq1.onrender.com/notification/createNotif', {
        recipientId: user.data._id,
        senderId: userInfo._id,
        message: successMessage,
      });

      socket.emit('sendInvite', {
        recipientId: user.data._id,
        message: successMessage,
      });

      setEmail('');
      setRole('');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'An error occurred.';
      setMessage(errorMessage);
      setMessageType('error'); // Error type
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (email) => {
    setEmail(email);
    setSuggestions([]);
  };

  const navigateToTeamMember = () => {
    navigate(`/site/${id}/team/list`);
  };

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const getSiteId = async () => {
      try {
        const result = await axios.get(
          `https://pro1-ubq1.onrender.com/site/getSiteId/${id}/${userInfo._id}`
        );
        setSite(result.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    getSiteId();
  }, [id, userInfo?._id]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-white">
      <SideBarLeft />
      <div className="flex-1 p-8">
        <ToastContainer />
        <NavBarSign />
        {!Error && (
          <div className="flex flex-col gap-8 bg-white rounded-xl shadow-lg p-6 sm:p-10 h-full overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">
                  Organisation
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Organisation:{' '}
                  <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                    {site.organisation}
                  </span>
                </p>
                <p className="text-[15px] text-gray-500">
                  All invited people will be granted access to all surveys of{' '}
                  <a
                    href="#test"
                    className="text-orange-700 text-[13px] underline hover:text-orange-900"
                  >
                    {site.url}
                  </a>
                  .
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  className="flex items-center gap-3 text-sm sm:text-base border border-blue-900 px-6 py-2 rounded-lg text-blue-900 font-bold hover:bg-blue-100 transition-transform hover:scale-105"
                  onClick={navigateToTeamMember}
                >
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    className="text-sm sm:text-base"
                  />
                  Team members
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 mt-8">
              <div className="flex flex-col gap-4 sm:w-1/2">
                <h1 className="text-sm sm:text-base font-semibold text-gray-700">
                  Team member
                </h1>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    value={email}
                    onChange={handleEmailInput}
                    placeholder="Enter email address"
                    className="border border-gray-300 w-full py-2 pl-14 pr-4 rounded-lg text-[14px] text-gray-800 sm:text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg hover:border-blue-400"
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {suggestions.map((user) => (
                        <li
                          key={user._id}
                          className="p-2 hover:bg-blue-100 text-[12px] cursor-pointer"
                          onClick={() => handleSuggestionClick(user.email)}
                        >
                          {user.email}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:w-1/2">
                <h1 className="text-sm sm:text-base font-semibold text-gray-700">
                  Access level
                </h1>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border border-gray-300 w-full py-2 px-4 text-[14px] sm:text-[14px] rounded-lg text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg hover:border-blue-500 cursor-pointer"
                >
                  <option
                    value=""
                    disabled
                    className="text-[14px] sm:text-[14px]"
                  >
                    Select role
                  </option>
                  <option value="read">Read</option>
                  <option value="read_write">Read & Write</option>
                </select>
              </div>
            </div>

            <div className="flex justify-start mt-8">
              <button
                onClick={sendInvite}
                disabled={loading}
                className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all ${
                  loading ? 'cursor-wait opacity-50' : 'cursor-pointer'
                }`}
              >
                {loading ? 'Sending...' : 'Send Invite'}
              </button>
            </div>

            {message && (
              <div
                className={`mt-4 text-center text-sm ${
                  messageType === 'success' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Invite;
