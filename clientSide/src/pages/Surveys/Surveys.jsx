import { useEffect, useState, React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import SideBarLeft from '../SideBar/SideBarLeft';
import axios from 'axios';
import Table from './Table';
import PopularTemplate from '../Templates/PopularTemplate';
import TrackingCode from './TrackingCode';
import { useStateProvider } from '../../context/StateContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Surveys = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteSurveyId, setDeleteSurveyId] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [openTracking, setOpenTracking] = useState(false);
  const [siteData, setSiteData] = useState('');
  const [searchState, setSearchState] = useState(false);
  const [{ userInfo }] = useStateProvider();
  const [role, setRole] = useState('');
  const [Error, setError] = useState(false);

  const { id } = useParams();
  const getSurveys = async () => {
    if (!userInfo || !userInfo._id) {
      return;
    }
    try {
      const AllSurveys = await axios.get(
        `https://pro-1-hk8q.onrender.com/survey/getSurveys/${id}/${userInfo._id}`
      );
      const surveysData = await Promise.all(
        AllSurveys.data.surveys.map(async (survey) => {
          const responseCount = await countResponses(survey._id);
          return {
            ...survey,
            responseCount: isNaN(Number(responseCount))
              ? 0
              : Number(responseCount),

            formattedCreatedAt: formatCreatedAt(survey.createdAt),
          };
        })
      );
      setSurveys(surveysData);
      setRole(AllSurveys.data.userRole);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  const NavigateToTemplate = () => {
    navigate(`/site/${id}/templates`);
  };

  const searchSurveys = async (query) => {
    if (!userInfo || !userInfo._id) {
      return;
    }
    try {
      const response = await axios.get(
        `https://pro-1-hk8q.onrender.com/survey/search/${userInfo._id}`,
        { params: { query } }
      );
      const formattedSurveys = response.data.map((survey) => ({
        ...survey,
        formattedCreatedAt: formatCreatedAt(survey.createdAt),
      }));
      setSurveys(formattedSurveys);
      setSearchState(true);
    } catch (error) {
      console.error('Error searching surveys:', error);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      searchSurveys(query);
    } else {
      getSurveys();
    }
  };

  const formatCreatedAt = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      if (days === 1) {
        return 'yesterday';
      } else {
        return `${days} days ago`;
      }
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return 'just now';
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteSurveyId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://pro-1-hk8q.onrender.com/survey/delete/${deleteSurveyId}`
      );
      setSurveys(surveys.filter((survey) => survey._id !== deleteSurveyId));
    } catch (error) {
      console.error('Error deleting survey:', error);
    } finally {
      setShowConfirm(false);
      setDeleteSurveyId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteSurveyId(null);
  };

  const toggleSurveyStatus = async (id, currentStatus) => {
    try {
      const response = await axios.post(
        `https://pro-1-hk8q.onrender.com/survey/updateStatus/${id}`,
        { status: !currentStatus }
      );
      const updatedSurvey = response.data;
      setSurveys(
        surveys.map((survey) =>
          survey._id === updatedSurvey._id
            ? { ...survey, status: updatedSurvey.status }
            : survey
        )
      );
    } catch (error) {
      console.error('Error updating survey status:', error);
    }
  };

  const handleEditClick = (templateId, surveyid) => {
    navigate(`/site/${id}/surveys/edit/${surveyid}`);
  };
  const NavigateToOverview = () => {
    navigate(`/site/${id}/overview`);
  };
  const handleResponse = (surveyId) => {
    navigate(`/site/${id}/survey/${surveyId}/response`);
  };

  const countResponses = async (id) => {
    try {
      const result = await axios.post(
        `https://pro-1-hk8q.onrender.com/response/numberResponses/${id}`
      );
      return result.data.responseCount;
    } catch (error) {
      console.error('Error counting responses:', error);
      return 0;
    }
  };
  const handleClick = (templateId) => {
    navigate(`/site/${id}/survey/create/template/${templateId}`);
  };

  const handleCopyCode = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(siteData.trackingCode);
        toast.success('Tracking code copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy tracking code');
      }
    }
  };
  useEffect(() => {
    const getTemplates = async () => {
      const templates = await axios.get(
        `https://pro-1-hk8q.onrender.com/templates/getTemplates`
      );
      const result = templates.data;
      const filteredTemplate = result.slice(0, 3);
      setTemplates(filteredTemplate);
    };
    const fetchTrackingCode = async () => {
      if (!userInfo || !userInfo._id) {
        return;
      }
      try {
        const response = await axios.get(
          `https://pro-1-hk8q.onrender.com/site/getSiteId/${id}/${userInfo._id}`
        );
        setSiteData(response.data);
      } catch (error) {
        console.error('Failed to fetch tracking code', error);
      }
    };

    getTemplates();
    getSurveys();
    fetchTrackingCode();
  }, [id, userInfo?._id]);

  useEffect(() => {
    const getSiteId = async () => {
      if (!userInfo || !userInfo._id) {
        return;
      }
      try {
        await axios.get(
          `https://pro-1-hk8q.onrender.com/site/getSiteId/${id}/${userInfo._id}`
        );
      } catch (err) {
        console.error(err);
        setError(true);
        navigate(`/site/${id}/permission-required`);
      }
    };
    getSiteId();
  }, [id, navigate, userInfo?._id]);
  return (
    <div className="absolute flex h-screen bg-gray-100 scroll-hidden w-full">
      <ToastContainer />
      <SideBarLeft />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        {!Error && (
          <div className="flex flex-1 overflow-hidden  ">
            <div className=" flex-1  p-8 overflow-auto gap-[20px] ">
              <div className="flex items-center gap-4 p-2  bg-yellow-100 border-2 border-yellow-300 rounded-lg shadow-md transition-transform transform hover:scale-90 w-full left-0">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="w-5 h-5 text-yellow-600"
                />
                <div className="flex flex-col w-full">
                  <p className="text-[14px] text-yellow-800 mb-1">
                    There might be an issue with your tracking code.
                  </p>
                  <p
                    className="underline text-[13px] cursor-pointer text-yellow-700 hover:text-yellow-600 transition-colors"
                    onClick={() => setOpenTracking(true)}
                  >
                    Verify tracking code installation
                  </p>
                </div>
              </div>

              <div className="flex items-center p-[20px] justify-between mb-6 gap-[10px]">
                <h1 className="lg:text-2xl text-[20px] font-bold text-gray-800">
                  Surveys
                </h1>
                <div className="flex items-center space-x-4">
                  <button
                    className={` text-white lg:px-6 lg:py-3 px-1 py-1 rounded-full lg:text-[13px] text-[6px] font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105  ${role === 'read' ? 'opacity-50 cursor-not-allowed bg-gray-500' : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:scale-105 hover:bg-blue-700 focus:outline-none'}`}
                    onClick={NavigateToOverview}
                    disabled={role === 'read'}
                  >
                    Set Up Survey
                  </button>

                  <button
                    className={` text-white lg:px-6 lg:py-3 rounded-full px-1 py-1 lg:text-[13px]  font-semibold text-[6px] shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105  ${role === 'read' ? 'opacity-50 cursor-not-allowed bg-gray-500 ' : 'bg-gradient-to-r from-green-600 to-green-800 hover:bg-green-700 focus:outline-none'} `}
                    onClick={NavigateToTemplate}
                    disabled={role === 'read'}
                  >
                    New Survey
                  </button>
                </div>
              </div>
              {(surveys.length > 0 || searchState === true) && (
                <div className="flex items-center relative mb-6">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute top-3 left-3 text-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Filter by survey name or creator"
                    className="flex items-center w-full border border-blue-300 rounded-lg pl-10 pr-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:border-gray-400"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              )}
              <div className="relative flex flex-col gap-[50px]">
                {surveys.length > 0 && (
                  <Table
                    role={role}
                    surveys={surveys}
                    toggleSurveyStatus={toggleSurveyStatus}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    showConfirm={showConfirm}
                    confirmDelete={confirmDelete}
                    cancelDelete={cancelDelete}
                    handleResponse={handleResponse}
                  />
                )}
                <PopularTemplate
                  templates={templates}
                  handleClick={handleClick}
                  NavigateToTemplate={NavigateToTemplate}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {openTracking && (
        <TrackingCode
          setOpenTracking={setOpenTracking}
          siteData={siteData}
          handleCopyCode={handleCopyCode}
        />
      )}
    </div>
  );
};

export default Surveys;
