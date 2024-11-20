import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

export const Table = ({ Questions, Responses, confirmDeleteResponse }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-auto">
        <thead className="bg-blue-600 text-white sticky top-0">
          <tr>
            {Questions.map((question, index) => {
              const truncatedQuestion =
                question.length > 60
                  ? question.substring(0, 60) + '...'
                  : question;
              return (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-[13px] font-semibold tracking-wide border-r border-gray-200 last:border-r-0 break-words"
                >
                  {truncatedQuestion}
                </th>
              );
            })}
            <th className="px-6 py-3 text-[13px] font-semibold tracking-wide break-words">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Responses.map((response, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 border-b border-gray-200 last:border-none transition duration-150"
            >
              {Questions.map((question, qIndex) => {
                const matchingResponse = response.responses.find(
                  (res) => res.question === question
                );
                const truncateText = (text) => {
                  if (typeof text === 'string' && text.length > 60) {
                    return text.substring(0, 60) + '...';
                  }
                  return text;
                };

                return (
                  <td
                    key={qIndex}
                    className="px-6 py-4 text-[12px] text-gray-700 whitespace-normal border-r border-gray-200 last:border-r-0 break-words"
                  >
                    {matchingResponse ? (
                      Array.isArray(matchingResponse.responseValue) ? (
                        matchingResponse.responseValue.map((value, i) => (
                          <div key={i}>*{truncateText(value)}</div>
                        ))
                      ) : (
                        truncateText(matchingResponse.responseValue)
                      )
                    ) : (
                      <span className="text-gray-400">No answer</span>
                    )}
                  </td>
                );
              })}
              <td className="px-6 py-4 flex justify-center">
                <FontAwesomeIcon
                  onClick={() => confirmDeleteResponse(response._id)}
                  icon={faTrash}
                  className="w-[15px] h-[15px] text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-150"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
Table.propTypes = {
  Questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  Responses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      responses: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          responseValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
          ]).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  confirmDeleteResponse: PropTypes.func.isRequired,
};
