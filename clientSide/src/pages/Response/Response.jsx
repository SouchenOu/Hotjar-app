import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../Navbar/NavBar';
import SideBarLeft from '../SideBar/SideBarLeft';
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, React } from 'react';
import { useStateProvider } from '../../context/StateContext';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Table } from './Table';

const Response = () => {
  const { surveyId } = useParams();
  const [Responses, setResponses] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [textDirection, setTextDirection] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteResponseId, setDeleteResponseId] = useState('');
  const [{ userInfo }] = useStateProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const survey = await axios.get(
          `https://pro1-ubq1.onrender.com/survey/getSurvey/${surveyId}`
        );
        if (survey.status === 200) {
          const surveyData = survey.data;
          const surveyQuestions = surveyData.components.map(
            (component) => component.question
          );
          const result = surveyQuestions.slice(0, 3);
          setQuestions(result);

          if (surveyData.language === 'ar') {
            setTextDirection('rtl');
          } else {
            setTextDirection('ltr');
          }
        }
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    const getResponses = async () => {
      try {
        const response = await axios.post(
          `https://pro1-ubq1.onrender.com/response/responseSurvey/${surveyId}`
        );
        if (response.status === 200) {
          setResponses(response.data);
        }
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    getSurvey();
    getResponses();
  }, [surveyId]);

  const navigateToSurveys = async () => {
    const lastSiteRes = await axios.get(
      `https://pro1-ubq1.onrender.com/site/lastSite/${userInfo._id}`
    );
    const lastSite = lastSiteRes.data;
    navigate(`/site/${lastSite.siteId}/surveys`);
  };

  const deleteResponse = async () => {
    try {
      const response = await axios.post(
        `https://pro1-ubq1.onrender.com/response/deleteResponse/${deleteResponseId}`
      );
      if (response.status === 200) {
        setResponses(Responses.filter((r) => r._id !== deleteResponseId));
        toast.success('Response deleted successfully');
        setShowConfirm(false);
      } else {
        toast.error('Error deleting response. Please try again.');
      }
    } catch (error) {
      toast.error('Error deleting response. Please try again.');
    }
  };

  const confirmDeleteResponse = (id) => {
    setDeleteResponseId(id);
    setShowConfirm(true);
  };

  const downloadResponsesAsCSV = () => {
    if (!Responses.length) {
      console.warn('No responses available to download');
      return;
    }

    const csvData = Responses.map((response, index) => {
      const responseData = { 'Response #': index + 1 };
      Questions.forEach((question) => {
        const matchingResponse = response.responses.find(
          (res) => res.question === question
        );
        responseData[question] = matchingResponse
          ? matchingResponse.responseValue
          : 'No answer';
      });
      return responseData;
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'survey_responses.csv');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      <SideBarLeft />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <div className="flex flex-1 overflow-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex-1 overflow-auto max-w-full">
            <div className="flex items-center gap-4 mb-6 cursor-pointer">
              <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
                <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
                <span className="ml-2 text-[15px]" onClick={navigateToSurveys}>
                  Back to all surveys
                </span>
              </div>
            </div>
            {Responses.length !== 0 && (
              <div
                className="p-8 rounded-lg overflow-hidden shadow-lg"
                dir={textDirection}
              >
                <button
                  onClick={downloadResponsesAsCSV}
                  className="flex font-semibold text-[12px] gap-[10px] mb-4 px-3 py-3 bg-blue-600 shadow-2xl text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="w-[15px] h-[15px]"
                  />
                  Download Responses
                </button>
                <Table
                  Questions={Questions}
                  Responses={Responses}
                  confirmDeleteResponse={confirmDeleteResponse}
                />
              </div>
            )}
            {Responses.length === 0 && (
              <div className="flex flex-col items-center justify-center p-16">
                <h1 className="text-[17px] font-bold">
                  Your survey is up and running
                </h1>
                <p className="text-[14px] text-gray-500">
                  When you get responses, you&apos;ll find them here
                </p>
              </div>
            )}
          </div>
        </div>
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="flex flex-col gap-6 bg-white w-[90%] sm:w-[500px] rounded-lg p-6 shadow-2xl transform transition-all duration-500 scale-100 opacity-100">
              <div className="flex flex-col items-center gap-[10px]">
                <h2 className="text-[20px] text-gray-900 font-semibold text-center ">
                  Are you sure?
                </h2>
                <p className="text-[16px] text-gray-600 text-center ">
                  Deleting a response is permanent and cannot be undone.
                </p>
              </div>

              <div className="flex justify-center gap-6">
                <button
                  className="px-6 py-2 text-[15px] font-bold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 text-[15px] font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  onClick={deleteResponse}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;
