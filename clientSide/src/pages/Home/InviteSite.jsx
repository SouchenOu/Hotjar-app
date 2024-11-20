import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

export const InviteSite = ({ sites, setSitesVisible, handleSendInvite }) => {
  return (
    <>
      <div className="fixed inset-0 bg-blue-900 bg-opacity-50 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white shadow-lg p-8 border border-blue-300 rounded-lg mr-[100px]  2xl:w-[70%] w-[50%] 2xl:max-w-[500px] max-h-[90%] overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[17px] font-bold text-gray-500">Sites List</h3>
            <FontAwesomeIcon
              icon={faXmark}
              className="w-4 h-4 cursor-pointer text-red-600 hover:text-red-800 transition duration-200"
              onClick={() => setSitesVisible(false)}
            />
          </div>

          <ul className="space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hidden">
            {sites.map((site) => (
              <li
                key={site._id}
                className=" flex-col lg:flex-row p-4  shadow-2xl hover:shadow-lg cursor-pointer hover:bg-gray-100 transition-shadow duration-300 rounded-lg border border-gray-300 flex items-center justify-between"
              >
                <div>
                  <p className="2xl:text-[14px] text-[14px] font-semibold text-orange-900">
                    URL: <p className="text-blue-800">{site.url}</p>
                  </p>
                  <p className="text-[15px] text-gray-600 mt-1">
                    Owner:{' '}
                    <span className="text-gray-800 text-[15px] font-medium">
                      {site.created.username}
                    </span>
                  </p>
                </div>
                <button
                  className="mt-2 text-[15px] font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                  onClick={() => handleSendInvite(site)}
                >
                  Send Invite
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

InviteSite.propTypes = {
  sites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      created: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setSitesVisible: PropTypes.func.isRequired,
  handleSendInvite: PropTypes.func.isRequired,
};
