import { createContext, useContext, useEffect, useState, React } from 'react';
import { useStateProvider } from './StateContext';
import { reducerCases } from './constants';
import PropTypes from 'prop-types';

const AuthenticationContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, dispatch] = useStateProvider();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user_data'));
    if (storedData) {
      const { userToken, user } = storedData;

      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
      dispatch({ type: reducerCases.SET_USER_INFO, userInfo: user });
    }
  }, [dispatch]);

  const login = (newToken, newData) => {
    localStorage.setItem(
      'user_data',
      JSON.stringify({ userToken: newToken, user: newData })
    );

    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);

    dispatch({ type: reducerCases.SET_USER_INFO, userInfo: newData });
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    dispatch({ type: reducerCases.SET_USER_INFO, userInfo: null });
  };

  return (
    <AuthenticationContext.Provider
      value={{ token, isAuthenticated, userData, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthenticationContext);
