import { useState } from 'react';
import { useAuth } from '../context/AuthenticationContext.js';
import { message } from 'antd';

const useSignIN = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user);
        return { success: true, message: data.message };
      } else if (res.status === 400) {
        setError(data.message);
        return { success: false, message: data.message };
      } else {
        const errorMsg = 'Registration failed';
        setError('Registration failed');
        message.error('Registration failed');
        return { success: false, message: errorMsg };
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useSignIN;
