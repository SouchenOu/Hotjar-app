import { useEffect, useState, React } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context/AuthenticationContext';
import { useStateProvider } from './context/StateContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [{ userInfo }] = useStateProvider();
  const [hasSites, setHasSites] = useState(null);

  useEffect(() => {
    const checkUserSites = async () => {
      if (isAuthenticated && userInfo) {
        try {
          const checkRes = await axios.get(
            `https://pro1-ubq1.onrender.com/site/checkSites/${userInfo._id}`
          );
          setHasSites(checkRes.data.hasSites);
        } catch (error) {
          console.error("Error checking user's sites:", error);
        }
      }
    };

    checkUserSites();
  }, [isAuthenticated, userInfo]);

  if (hasSites === null) return <div>Loading...</div>;

  return hasSites ? children : <Navigate to="/site" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default ProtectedRoute;
