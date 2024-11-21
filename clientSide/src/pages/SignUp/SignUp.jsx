import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Typography, Input, Button, Spin, Alert } from 'antd';
import useSignUp from '../../hooks/useSignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const { loading, error, RegisterUser, verifyCode } = useSignUp();
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState(
    new Array(6).fill('')
  );
  const [emailValue, setEmailValue] = useState('');
  const [userData, setUserData] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [form] = Form.useForm();

  const handleRegister = async () => {
    const finalCode = verificationCode.join('');
    const result = await RegisterUser(userData, finalCode);
    if (result.success) {
      setSuccess(result.message);
      navigate('/login');
    } else {
      setSuccess(null);
    }
  };

  const handleClick = async (values) => {
    setEmailValue(values.email);
    const emailVerificationResult = await verifyCode(values.email);
    if (emailVerificationResult.success === true) {
      setSuccess('Verification code sent! Please check your email.');
      setVerify(true);
      toast.success('Verification code sent! Please check your email.');
      setUserData(values);
    } else {
      toast.error(emailVerificationResult.message);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...verificationCode];
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

  useEffect(() => {
    form.resetFields();
    setVerificationCode(new Array(6).fill(''));
    setUserData('');
  }, [form]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center overflow-hidden">
      <ToastContainer />
      <div className="flex flex-col gap-[20px] lg:flex-row items-center justify-center w-full max-w-7xl min-h-[90vh] px-4">
        <Card
          className="w-[90%] max-w-[450px] lg:w-[400px] xl:w-[450px] p-4"
          style={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
          }}
        >
          <div className="flex flex-col gap-8 bg-white p-6 md:p-8 w-full rounded-lg shadow-xl">
            <h1 className="text-center text-[20px] md:text-[24px] font-bold text-blue-800">
              Sign Up
            </h1>

            <Form
              layout="vertical"
              autoComplete="off"
              onFinish={handleClick}
              className="w-full"
            >
              <Form.Item
                label="Full Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your full name',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your full name"
                  className="px-4 py-2 w-full border text-[13px] text-gray-800 border-gray-300 rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your email"
                  type="email"
                  className="px-4 py-2 w-full border text-[13px] text-gray-800 border-gray-300 rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password' },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
                    message:
                      'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.',
                  },
                ]}
              >
                <div className="relative">
                  <Input
                    size="large"
                    placeholder="Enter your password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="px-4 py-2 w-full border text-[13px] text-gray-800 border-gray-300 rounded-lg"
                  />
                  <FontAwesomeIcon
                    icon={showCurrentPassword ? faEyeSlash : faEye}
                    className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  />
                </div>
              </Form.Item>

              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="mb-4 p-2 flex text-[12px] items-center justify-center text-gray-700"
                />
              )}

              {success && (
                <Alert
                  className="mb-4 p-2 flex text-[12px] items-center justify-center text-gray-700"
                  description={success}
                  type="success"
                  showIcon
                  closable
                />
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold"
                >
                  {loading ? <Spin /> : 'Sign Up'}
                </Button>
              </Form.Item>

              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-4"
                >
                  <span className="text-gray-600">
                    Already have an account?
                  </span>
                  <Button
                    type="link"
                    className="text-blue-700 font-bold underline text-[14px]"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </Card>

        <div className="w-full md:w-1/2 h-64 md:h-screen hidden md:flex items-center justify-center">
          <img
            src="/img2.jpg"
            alt="Sign In"
            className="object-cover rounded-lg shadow-xl transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
          />
        </div>
      </div>
      {verify && (
        <div className="fixed inset-0 shadow-xl bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[340px] max-w-sm md:max-w-md">
            <FontAwesomeIcon
              icon={faClose}
              className="w-[20px] h[20px] text-red-800 cursor-pointer mb-[10px] ml-[17rem]"
              onClick={() => setVerify(false)}
            />
            <div className="flex flex-col gap-[4px]">
              <h3 className="text-[17px] font-semibold  text-gray-800">
                Verify Your Email
              </h3>
              <p className=" flex flex-col gap-[3px] text-[13px] mb-3 text-gray-600">
                We sent a verification code to{' '}
                <span className="text-blue-600 text-[13px] ">
                  {emailValue}.
                </span>
              </p>
            </div>

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
                  className="w-10 h-10 text-xl text-center border-2 border-gray-300 rounded-lg"
                />
              ))}
            </div>
            <Button
              type="primary"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg"
              onClick={handleRegister}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
