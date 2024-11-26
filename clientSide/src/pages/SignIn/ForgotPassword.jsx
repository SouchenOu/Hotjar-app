import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Typography, Input, Button, Alert } from 'antd';
import axios from 'axios';
import NavBarSign from '../Navbar/NavBarSign';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/forgotPassword`,
        { email }
      );
      setSuccess('Email sent successfully.');
      setError(null);
    } catch (err) {
      setError('Failed to send email. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-[20px] lg:flex-row items-center justify-center w-full max-w-7xl min-h-[90vh] px-4">
        <Card
          className="w-full max-w-[500px] lg:w-[400px] xl:w-[450px] p-4 mx-2"
          style={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
          }}
        >
          <div className="flex flex-col gap-8 bg-white p-6 md:p-8 w-full rounded-lg shadow-xl">
            <h1 className="text-center text-[20px] md:text-[24px] font-bold text-blue-800">
              Forgot Password
            </h1>

            <Typography.Paragraph className="text-center text-gray-600 text-[12px] md:text-[14px] mb-4">
              Please enter the email address you used when creating your
              account. We will send you a password reset link.
            </Typography.Paragraph>

            <Form
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-4"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-4 border text-[13px] border-gray-300 rounded-lg"
                />
              </Form.Item>

              {error && (
                <Alert
                  className="p-2 flex items-center justify-center text-gray-800"
                  description={error}
                  type="error"
                  showIcon
                  closable
                />
              )}
              {success && (
                <Alert
                  className="p-2 flex items-center justify-center text-gray-800"
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
                  className="w-full bg-blue-700 text-[14px] hover:bg-blue-800 text-white py-3 rounded-lg font-bold"
                >
                  Send Reset Email
                </Button>
              </Form.Item>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 text-[12px] font-bold"
                >
                  Go back to sign-in
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

export default ForgotPassword;
