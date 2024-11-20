import PropTypes from 'prop-types';
import {
  faCalendarPlus,
  faSitemap,
  faSquarePollHorizontal,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Menu = ({ handleSites, handleSurveys, navigateToProfile }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-[70px] right-[40px] md:right-[300px] lg:right-[300px] 2xl:right-[330px] bg-white shadow-xl p-6 border border-gray-100 rounded-2xl lg:w-[250px] md:w-[200px] z-20 transition-all duration-300 ease-in-out">
      <div className="flex flex-col space-y-4">
        <div
          className="flex items-center gap-4 hover:bg-blue-50 w-full py-3 px-4 border-b border-gray-100 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md"
          onClick={handleSites}
        >
          <FontAwesomeIcon
            icon={faCalendarPlus}
            className="text-blue-600 w-[20px] h-[20px]"
          />
          <p className="text-[15px] text-gray-800 font-medium">Send Invite</p>
        </div>

        <div
          className="flex items-center gap-4 hover:bg-blue-50 w-full py-3 px-4 border-b border-gray-100 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md"
          onClick={handleSurveys}
        >
          <FontAwesomeIcon
            icon={faSquarePollHorizontal}
            className="text-blue-600 w-[20px] h-[20px]"
          />
          <p className="text-[15px] text-gray-800 font-medium">Surveys</p>
        </div>

        <div
          className="flex items-center gap-4 hover:bg-blue-50 w-full py-3 px-4 border-b border-gray-100 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md"
          onClick={navigateToProfile}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-blue-600 w-[20px] h-[20px]"
          />
          <p className="text-[15px] text-gray-800 font-medium">Profile</p>
        </div>

        <div
          className="flex items-center gap-4 hover:bg-blue-50 w-full py-3 px-4 rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md"
          onClick={() => navigate('/sites')}
        >
          <FontAwesomeIcon
            icon={faSitemap}
            className="text-blue-600 w-[20px] h-[20px]"
          />
          <p className="text-[15px] text-gray-800 font-medium">Sites Created</p>
        </div>
      </div>
    </div>
  );
};

Menu.propTypes = {
  handleSites: PropTypes.func.isRequired,
  handleSurveys: PropTypes.func.isRequired,
  navigateToProfile: PropTypes.func.isRequired,
};
