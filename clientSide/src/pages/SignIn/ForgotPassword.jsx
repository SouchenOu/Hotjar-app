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
      await axios.post('http://localhost:8000/auth/forgotPassword', { email });
      setSuccess('Email sent successfully');
      setError(null);
    } catch (err) {
      setError('Failed to send email');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-white">
      <NavBarSign />
      <div className="flex items-center gap-[60px] justify-center ">
        <Card className="w-[450px] p-[40px] lg:mt-[10px] mt-[50px] rounded-lg shadow-2xl bg-white">
          <h1 className="text-center text-[19px] font-bold text-blue-600">
            Forgot Password
          </h1>

          <Typography.Paragraph className="text-center text-gray-500 text-[12px] mb-[30px]">
            Please enter the email address you used when creating your account,
            and we will send you a reset link.
          </Typography.Paragraph>

          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-[20px]"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input
                size="large"
                placeholder="Enter your Email"
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
