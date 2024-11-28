import { useNavigate, useParams } from 'react-router-dom';
import { useStateProvider } from '../../context/StateContext';
import NavBar from '../Navbar/NavBar';
import SideBarLeft from '../SideBar/SideBarLeft';
import axios from 'axios';
import { useEffect, useState, React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Overview = () => {
  const [{ userInfo }] = useStateProvider();
  const [trackingCode, setTrackingCode] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackingCode = async () => {
      try {
        const response = await axios.get(
          `https://pro-1-hk8q.onrender.com/site/getSiteId/${id}/${userInfo._id}`
        );
        setTrackingCode(response.data.trackingCode);
      } catch (error) {
        console.error('Failed to fetch tracking code', error);
      }
    };

    fetchTrackingCode();
  }, [id]);

  const handleCopyCode = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(trackingCode);
        toast.success('Tracking code copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy tracking code');
      }
    }
  };

  const navigateToSurveys = async () => {
    const lastSiteRes = await axios.get(
      `https://pro-1-hk8q.onrender.com/site/lastSite/${userInfo._id}`
    );
    const lastSite = lastSiteRes.data;
    navigate(`/site/${lastSite.siteId}/surveys`);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-100">
      <SideBarLeft />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <div className="flex-1 overflow-y-auto justify-between p-4 lg:p-8">
          <div className="flex-1 flex flex-col bg-white shadow-md rounded-lg">
            <div className="flex items-center gap-4 mb-6 cursor-pointer p-4 lg:p-6">
              <div
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={navigateToSurveys}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
                <span className="ml-2 text-[16px]">Back to all surveys</span>
              </div>
            </div>
            <div className="p-4 lg:p-8 border-b">
              <h1 className="text-[20px] font-semibold text-gray-800">
                Welcome, {userInfo ? userInfo.username : 'Guest'}
              </h1>
              <p className="text-gray-600 lg:text-[14px] lg:w-full w-[200px] mt-2">
                Install the tracking code on your site to get access to all
                features, tools, and the insights you need. It&apos;s fast and
                easy.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 border border-gray-200">
              <h2 className="text-[16px] font-semibold mb-4 text-gray-800">
                Setup Instructions
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <h3 className="text-[15px] font-medium text-gray-700 mb-2">
                    1. Copy the Code
                  </h3>
                  {trackingCode ? (
                    <div>
                      <pre className="bg-gray-200 p-3 rounded-md lg:text-[15px] text-[12px] lg:w-full w-[200px] text-gray-600 overflow-x-auto">
                        {trackingCode}
                      </pre>
                      <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-[14px] text-white rounded-md hover:bg-blue-600 transition ease-in-out duration-150"
                        onClick={handleCopyCode}
                      >
                        Copy Code
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-[15px]">
                      Loading tracking code...
                    </p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <h3 className="text-[16px] font-medium text-gray-700 mb-2">
                    2. Paste the Code
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    Paste the code into the{' '}
                    <code className="bg-gray-200 p-1 rounded">head</code> of
                    every page where you want to track user behavior or collect
                    survey.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <h3 className="text-[16px] font-medium  text-gray-700 mb-2">
                    3. Verify Installation
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    To make sure everything is ready, verify that your code was
                    installed correctly by checking the Survey dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
