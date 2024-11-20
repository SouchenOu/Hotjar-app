import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Typography, Input, Button, Spin, Alert } from 'antd';
import useSignIN from '../../hooks/useSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const { loading, error, loginUser } = useSignIN();
  const [success, setSuccess] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (values) => {
    const result = await loginUser(values);
    if (result.success) {
      setSuccess(result.message);
      navigate('/');
    } else {
      setSuccess(null);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl min-h-[90vh]">
        <Card className="w-full max-w-[500px] lg:w-[400px] xl:w-[450px] p-4 mx-2">
          <div className="flex flex-col gap-8 bg-white p-6 md:p-8 w-full rounded-lg shadow-xl">
            <h1 className="text-center text-[20px] md:text-[24px] font-bold text-blue-800">
              Sign In
            </h1>
            <div className="flex items-center gap-4 w-full">
              <div className="border-t-2 w-1/4 lg:w-32 border-gray-400"></div>
              <Typography.Text className="text-center text-gray-600">
                Or, sign in with email
              </Typography.Text>
              <div className="border-t-2 w-1/4 lg:w-32 border-gray-400"></div>
            </div>

            <Form
              layout="vertical"
              autoComplete="off"
              onFinish={handleClick}
              className="w-full"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email' },
                  { type: 'email', message: 'Please enter a valid email' },
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
              <div className="text-left mb-4">
                <span
                  className="text-blue-600 underline text-[13px] cursor-pointer"
                  onClick={() => navigate('/forgotpassword')}
                >
                  Forgot password?
                </span>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold"
                >
                  {loading ? <Spin /> : 'Sign In'}
                </Button>
              </Form.Item>
              <div className="text-center mt-6">
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-4"
                >
                  <span className="text-gray-600">Need a Survey account?</span>
                  <Button
                    type="link"
                    className="text-blue-700 font-bold underline text-[14px]"
                  >
                    Sign Up
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
    </div>
  );
};

export default SignIn;
