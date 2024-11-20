import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, React } from 'react';
import Toast from './data/Toast';
import PropTypes from 'prop-types';

const TrackingCode = ({ setOpenTracking, siteData, handleCopyCode }) => {
  const [elem, setElem] = useState(false);
  const [VerifyMessage, setVerifyMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const verifyInstallation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/site/verifyTracking',
        {
          url: siteData.url,
          trackingCode: siteData.trackingCode,
        }
      );
      const isSuccess = response.status === 200;
      setVerifyMessage(
        `${isSuccess ? '✅🎉🎉' : '❌'} ${response.data.message}`
      );

      setToastMessage(
        isSuccess
          ? 'Installation Verified Sucessfully 🎉🎉!'
          : 'Verification Failed'
      );
      setToastType(isSuccess ? 'success' : 'failure');
    } catch (error) {
      setVerifyMessage(
        error.response?.data.message || 'Failed to verify installation.'
      );
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
      <div className="bg-white rounded-2xl shadow-xl lg:w-[900px] h-[460px] p-8 relative transition-transform transform hover:scale-105">
        <button
          onClick={() => setOpenTracking(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faClose} className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-[50px] border-b border-gray-300 pb-3">
          <h1
            className={`cursor-pointer text-[15px] font-semibold ${!elem ? 'text-blue-600 underline' : 'text-gray-600'}`}
            onClick={() => setElem(false)}
          >
            Tracking Code
          </h1>
          <h1
            className={`cursor-pointer text-[15px] font-semibold ${elem ? 'text-blue-600 underline' : 'text-gray-600'}`}
            onClick={() => setElem(true)}
          >
            Verify Installation
          </h1>
        </div>

        {!elem && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-[17px] font-semibold">
                Tracking Code for{' '}
                <span className="text-blue-600">{siteData.name}</span>
              </h2>
              <p className="text-gray-500 text-[13px]">
                Paste the Survey code into the head element of every page you
                wish to track users and collect feedback. Then verify your
                installation.
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-[2px] text-[13px] text-gray-700 border border-gray-300 shadow-sm">
              <pre>{siteData.trackingCode}</pre>
            </div>

            <button
              className="bg-blue-600 text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-150"
              onClick={handleCopyCode}
            >
              Copy Code
            </button>
          </div>
        )}

        {elem && (
          <div className="p-6 space-y-8">
            <div className="flex flex-col gap-[4px]">
              <h2 className="text-[16px] text-gray-800 font-semibold">
                Verify Your Installation
              </h2>
              <p className="text-[12px] text-gray-600">
                Enter the URL of the site where you installed the tracking code.
                Example: https://www.yoursite.com or https://localhost:8000
              </p>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                className="w-full max-w-xl text-gray-700 text-[14px] px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter the site URL"
                value={siteData.url}
                readOnly
              />

              <button
                className={`bg-blue-600 text-white text-[14px] font-bold px-6 py-3 rounded-lg shadow-md ${loading ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-700 transition ease-in-out duration-150'}`}
                onClick={verifyInstallation}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Installation'}
              </button>
            </div>

            {VerifyMessage && (
              <p
                className={`text-[12px] font-semibold ${VerifyMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}
              >
                {VerifyMessage}
              </p>
            )}

            <Toast
              message={toastMessage}
              type={toastType}
              onClose={() => setToastMessage('')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

TrackingCode.propTypes = {
  setOpenTracking: PropTypes.func.isRequired,
  siteData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    trackingCode: PropTypes.string.isRequired,
  }).isRequired,
  handleCopyCode: PropTypes.func.isRequired,
};

export default TrackingCode;
