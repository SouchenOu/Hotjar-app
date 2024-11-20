import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Typography, Input, Button, Spin, Alert } from 'antd';
import useSignUp from '../../hooks/useSignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const { loading, error, registerUser } = useSignUp();
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const result = await registerUser(values);
    if (result.success) {
      setSuccess(result.message);
      navigate('/signin');
    } else {
      setSuccess(null);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center overflow-hidden">
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
              onFinish={handleSubmit}
              className="w-full"
            >
              <Form.Item
                label="Full Name"
                name="fullName"
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
                  {
                    required: true,
                    message: 'Please input your password',
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters',
                  },
                ]}
              >
                <div className="relative">
                  <Input
                    size="large"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    className="px-4 py-2 w-full border text-[13px] text-gray-800 border-gray-300 rounded-lg"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Passwords do not match')
                      );
                    },
                  }),
                ]}
              >
                <div className="relative">
                  <Input
                    size="large"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="px-4 py-2 w-full border text-[13px] text-gray-800 border-gray-300 rounded-lg"
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
    </div>
  );
};

export default SignUp;
