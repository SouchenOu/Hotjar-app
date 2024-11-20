import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, React } from 'react';
import { useParams } from 'react-router-dom';
import { useStateProvider } from '../../context/StateContext';
import PropTypes from 'prop-types';

const ChangeEmail = ({ setCurrentForm }) => {
  const [verificationCode, setVerificationCode] = useState(
    new Array(6).fill('')
  );
  const { id } = useParams();
  const [, dispatch] = useStateProvider();
  const [emailValue, setEmail] = useState('');
  const [openVerify, setOpenVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);

  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  const sendVerifyCode = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        'https://pro1-ubq1.onrender.com/auth/sendVerificationCode',
        { newEmail: emailValue }
      );
      if (result.status === 200) {
        setOpenVerify(true);
        toast.success('Verification code sent to new email.');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newCode = [...verificationCode];

    if (/^[0-9]?$/.test(value)) {
      newCode[index] = value;
      setVerificationCode(newCode);
    }
  };
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .slice(0, verificationCode.length - index);
    const newCode = [...verificationCode];
    for (let i = 0; i < pastedData.length; i++) {
      if (i + index < verificationCode.length) {
        newCode[i + index] = pastedData[i];
      }
    }

    setVerificationCode(newCode);
    document
      .getElementById(
        `code-${Math.min(index + pastedData.length, verificationCode.length - 1)}`
      )
      .focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    } else if (e.key === 'ArrowRight' && index < verificationCode.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };
  const handleVerifyCode = async () => {
    const finalCode = verificationCode.join('');
    try {
      const response = await axios.post(
        'https://pro1-ubq1.onrender.com/auth/verifyCodeAndUpdateEmail',
        {
          userId: id,
          newEmail: emailValue,
          verificationCode: finalCode,
        }
      );
      dispatch({ type: 'SET_USER_INFO', userInfo: response.data.user });
      setVerify(true);
      setOpenVerify(false);
      toast.success('Email updated successfully.');
    } catch (error) {
      toast.error('Invalid verification code.');
    }
  };

  const navigateToProfile = () => {
    setCurrentForm('profile');
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-start gap-4 p-10">
        <div className="flex flex-col  gap-[30px]">
          <div className="flex gap-4 p-[5px] text-gray-500 text-lg">
            <h1
              className="hover:text-blue-700 text-[15px] cursor-pointer"
              onClick={navigateToProfile}
            >
              Account & Security
            </h1>
            <span>/</span>
            <h1 className="text-blue-700 text-[15px]">Change Email</h1>
          </div>

          <div className="flex flex-col gap-8 lg:w-[500px] h-[400px] lg:max-w-xl p-8 width-[200px] bg-white rounded-lg shadow-lg">
            <h1 className="text-[19px] text-gray-800 font-bold">
              Change Email
            </h1>
            <div className="flex flex-col">
              <h2 className="text-[14px] font-medium">
                Your new email address <span className="text-red-600">*</span>
              </h2>
              <p className="text-gray-600 text-[12px]">
                We&apos;ll send a code to your new email address to verify it.
              </p>
            </div>
            {verify && <h1 className="text-lg text-green-700">Verified</h1>}
            <div className="flex flex-col gap-4">
              <input
                type="email"
                onChange={handleEmailChange}
                className="px-4 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your new email"
              />
              <button
                onClick={sendVerifyCode}
                className="bg-blue-600 text-white font-medium text-[15px] rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200"
              >
                {!loading ? 'Change Email' : 'sending Code..'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {openVerify && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[400px] md:w-[500px]">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Verify Your Email
            </h3>
            <p className="text-lg mb-6 text-gray-600">
              We sent a verification code to{' '}
              <span className="text-blue-600">{emailValue}</span>.
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={verificationCode[index]}
                  onChange={(e) => handleChange(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ))}
            </div>
            <p className="text-lg text-gray-500 mb-6">
              Can&apos;t find the email? Check your spam folder, or re-enter
              your email and try again.
            </p>
            <div className="flex justify-between">
              <button
                className="border-2 border-gray-300 text-gray-700 font-medium px-6 py-2 rounded-md hover:bg-gray-100 transition duration-150"
                onClick={() => setOpenVerify(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-150"
                onClick={handleVerifyCode}
              >
                Confirm Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Define PropTypes
ChangeEmail.propTypes = {
  setCurrentForm: PropTypes.func.isRequired,
};

export default ChangeEmail;
