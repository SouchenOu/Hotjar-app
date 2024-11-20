import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const Table = ({
  filterWebsites,
  editingSiteId,
  newSiteUrl,
  handleUrlChange,
  handleSaveUrl,
  handleEditClick,
  copyToClipboard,
  handleDeleteClick,
}) => {
  return (
    <div className="overflow-x-auto">
      {' '}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
              ID
            </th>
            <th className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
              Site Name
            </th>
            <th className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
              Site URL
            </th>
            <th className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
              Industry
            </th>
            <th className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
              Tracking Code
            </th>
            <th className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filterWebsites.map((site) => (
            <tr key={site._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
                {site._id}
              </td>
              <td className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
                {site.name}
              </td>
              <td className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
                {editingSiteId === site._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newSiteUrl}
                      onChange={handleUrlChange}
                      className="border-2 border-gray-300 px-3 py-1 rounded-md"
                    />
                    <button
                      onClick={() => handleSaveUrl(site._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span>{site.url}</span>
                    <button
                      onClick={() => handleEditClick(site._id, site.url)}
                      className="text-blue-500 border-[1px] border-blue-600 font-medium px-[6px] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
              <td className="py-3 px-4 border-b text-left text-[14px] text-gray-700">
                {site.industry}
              </td>
              <td className="py-3 px-4 border-b text-left">
                <button
                  onClick={() => copyToClipboard(site.trackingCode)}
                  className="bg-blue-500 text-white px-4 text-[12px] font-bold py-2 rounded-md"
                >
                  Copy Code
                </button>
              </td>
              <td className="py-3 px-4 border-b text-left">
                <button
                  onClick={() => handleDeleteClick(site._id)}
                  className="text-red-500 hover:underline"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  filterWebsites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      industry: PropTypes.string.isRequired,
      trackingCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  editingSiteId: PropTypes.string,
  newSiteUrl: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleSaveUrl: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};
