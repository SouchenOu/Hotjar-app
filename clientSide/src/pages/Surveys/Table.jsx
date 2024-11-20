import {
  faEllipsisVertical,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState, React } from 'react';

const Table = ({
  role,
  surveys,
  toggleSurveyStatus,
  handleEditClick,
  handleDeleteClick,
  showConfirm,
  confirmDelete,
  cancelDelete,
  handleResponse,
}) => {
  const [MenuOpenId, setMenuOpenId] = useState(null);

  const toggleMenu = (id) => {
    setMenuOpenId(MenuOpenId === id ? null : id);
  };

  return (
    <div className="overflow-visible">
      <table className=" relative w-full h-full  bg-white border border-gray-200 rounded-xl shadow-lg scrollbar-hidden">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 text-[13px] uppercase tracking-wide font-semibold">
          <tr>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Responses</th>
            <th className="py-3 px-4 text-left">Created By</th>
            <th className="py-3 px-4 text-left">Created At</th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="relative">
          {surveys.map((survey) => (
            <tr
              key={survey._id}
              className="hover:bg-blue-50 transition duration-300"
            >
              <td className="py-3 px-4">
                <button
                  className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${
                    survey.status
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'bg-red-100 text-red-800 border-red-300'
                  } ${
                    role === 'read'
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() =>
                    role !== 'read' &&
                    toggleSurveyStatus(survey._id, survey.status)
                  }
                  disabled={role === 'read'}
                >
                  {survey.status ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="py-3 px-4 text-xs font-medium text-blue-600 underline">
                {survey.name}
              </td>
              <td className="py-3 px-4 text-xs text-center text-gray-800">
                {survey.responseCount}
              </td>
              <td className="py-3 px-4 text-xs text-gray-800">
                {survey.createdUser.username}
              </td>
              <td className="py-3 px-4 text-xs text-gray-800">
                {survey.formattedCreatedAt}
              </td>
              <td className="py-3 px-4 text-center text-xs text-gray-800">
                Popover
              </td>
              <td className="py-3 px-4 text-center relative">
                <button
                  className="px-4 py-2 bg-blue-100 text-xs text-blue-600 rounded-md font-semibold shadow-sm hover:bg-blue-200 transition"
                  onClick={() => handleResponse(survey._id)}
                >
                  View Responses
                </button>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="relative ml-4 text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => toggleMenu(survey._id)}
                />
                {MenuOpenId === survey._id && (
                  <div
                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    style={{ top: '100%' }}
                  >
                    <ul className="space-y-1">
                      <li
                        className={`flex items-center p-3 text-sm rounded-lg transition-all ${
                          role === 'read'
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'hover:bg-blue-50 cursor-pointer text-blue-600'
                        }`}
                        onClick={
                          role !== 'read'
                            ? () =>
                                handleEditClick(survey.templateId, survey._id)
                            : null
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          className={`mr-2 ${role === 'read' ? 'text-gray-400' : 'text-blue-600'}`}
                        />
                        Edit
                      </li>
                      <li
                        className={`flex items-center p-3 text-sm rounded-lg transition-all ${
                          role === 'read'
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'hover:bg-red-100 text-red-600 cursor-pointer'
                        }`}
                        onClick={
                          role !== 'read'
                            ? () => handleDeleteClick(survey._id)
                            : null
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={`mr-2 ${role === 'read' ? 'text-gray-400' : 'text-red-600'}`}
                        />
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {showConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-white p-8 rounded-lg  shadow-2xl w-[70%] sm:w-[500px] transform transition-all duration-300">
                <h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
                  Confirm Delete
                </h2>
                <p className="text-md text-gray-600 text-center mb-6">
                  Deleting this survey will also delete its responses. This
                  action is irreversible.
                </p>
                <div className="flex justify-center gap-6">
                  <button
                    onClick={cancelDelete}
                    className="px-6 py-2 text-[13px] font-bold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-6 py-2 text-[13px] font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  role: PropTypes.string.isRequired,
  surveys: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      responseCount: PropTypes.number.isRequired,
      createdUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      formattedCreatedAt: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      templateId: PropTypes.string,
    })
  ).isRequired,
  toggleSurveyStatus: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  showConfirm: PropTypes.bool.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

export default Table;
