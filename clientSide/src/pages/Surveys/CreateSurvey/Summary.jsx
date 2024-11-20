import {
  faCheck,
  faChevronDown,
  faChevronLeft,
  faEnvelope,
  faFileAlt,
  faGlobe,
  faHeart,
  faPenAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { reducerCases } from '../../../context/constants';
import Component from '../../Components/Component';
import PropTypes from 'prop-types';
import React from 'react';

const Summary = ({
  openComponent,
  setOpenComponent,
  state,
  dispatch,
  handleSubmit,
  isEditMode,
  nextQuestion,
  setNextQuestion,
}) => {
  const { status } = state;
  const [processing, setProcessing] = useState(false);

  const handleProcessSurvey = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      handleSubmit();
    }, 2000);
  };

  const handleToggle = () => {
    if (openComponent !== 'summary') {
      setOpenComponent('summary');
    } else {
      setOpenComponent(null);
    }
  };
  return (
    <div className="flex gap-[20px] ">
      <div className="flex flex-col w-full border-b-[2px] ">
        <div
          className="flex items-center w-full justify-between bg-white rounded-lg  hover:shadow-lg transition duration-200 ease-in-out  shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handleToggle()}
        >
          <div className="flex items-center gap-3 p-2 w-full">
            <FontAwesomeIcon
              icon={faCheck}
              className="w-3 h-3 p-2 rounded-full text-white"
              style={{ background: 'green' }}
            />
            <h1 className="text-[14px] font-ubuntu font-medium text-gray-80">
              Summary:
            </h1>
          </div>
          {openComponent !== 'summary' && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="w-[17px] h-[17px] cursor-pointer p-1"
              onClick={handleToggle}
            />
          )}
          {openComponent === 'summary' && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="w-[17px] h-[17px] cursor-pointer p-2"
              onClick={handleToggle}
            />
          )}
        </div>

        {openComponent === 'summary' && (
          <div className="flex items-center justify-between  p-[10px] bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-col p-10 2xl:w-[600px] w-[300px] gap-6 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col gap-4">
                <h1 className="text-[17px] font-bold text-gray-800">
                  {state.name}
                </h1>
                <p className="text-[15px] text-gray-600 px-2">
                  {state.description}
                </p>
              </div>
              {state.components.map((elem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 hover:bg-gray-50 rounded-lg p-2 transition"
                  onMouseEnter={() =>
                    dispatch({
                      type: reducerCases.SET_CURRENT_TYPE,
                      payload: elem.type,
                    })
                  }
                >
                  {elem.type === 'checkbox' && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-3 h-3 border-2 p-1 rounded-full border-gray-400"
                    />
                  )}
                  {elem.type === 'score' && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-3 h-3 border-2 p-1 rounded-full border-gray-400"
                    />
                  )}
                  {elem.type === 'radio' && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-3 h-3 border-2 p-1 rounded-full border-gray-400"
                    />
                  )}
                  {elem.type === 'scoreBox' && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-3 h-3 border-2 p-1 rounded-full border-gray-400"
                    />
                  )}
                  {elem.type === 'designFeedback' && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-3 h-3 border-2 p-1 rounded-full border-gray-400"
                    />
                  )}
                  {elem.type === 'nps' && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-3 h-3 border-2 p-1 rounded-full border-gray-400"
                    />
                  )}
                  {elem.type === 'longTextAnswer' && (
                    <FontAwesomeIcon
                      icon={faPenAlt}
                      className="w-3 h-3 text-gray-700"
                    />
                  )}
                  {elem.type === 'email' && (
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-3 h-3 text-gray-700"
                    />
                  )}
                  {elem.type === 'cta' && (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="w-3 h-3 text-gray-700"
                    />
                  )}

                  <p className="text-[15px] text-gray-900">{elem.question}</p>
                </div>
              ))}
              <div className="flex flex-col gap-4">
                <h1 className="text-[17px] font-bold text-gray-800">
                  Targeting
                </h1>

                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="w-4 h-4 text-gray-600"
                  />
                  <p className="text-[15px]">
                    Shows on{' '}
                    <p className="font-medium text-blue-600 hover:underline">
                      All pages
                    </p>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="w-4 h-4 text-gray-600"
                  />
                  <p className="text-[15px]">
                    Shows to{' '}
                    <p className="font-medium text-blue-600 hover:underline">
                      All users
                    </p>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="w-4 h-4 text-gray-600"
                  />
                  <p className="text-[15px]">
                    Shows to{' '}
                    <p className="font-medium text-blue-600 hover:underline">
                      100% of all traffic
                    </p>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg">
                <h1 className="text-[17px] font-bold text-gray-800">
                  Survey Status
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      className="w-4 h-4 appearance-none rounded-full border-2 border-gray-700 bg-white cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none"
                      type="checkbox"
                      checked={status}
                      onChange={() =>
                        dispatch({
                          type: reducerCases.SET_STATUS,
                          payload: true,
                        })
                      }
                    />
                    <h1 className="text-[15px]">Active</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      className="w-4 h-4 appearance-none rounded-full border-2 border-gray-700 bg-white cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none"
                      type="checkbox"
                      checked={!status}
                      onChange={() =>
                        dispatch({
                          type: reducerCases.SET_STATUS,
                          payload: false,
                        })
                      }
                    />
                    <h1 className="text-[15px]">Inactive</h1>
                  </div>
                </div>
              </div>
              <button
                className={`border-2 border-transparent rounded-xl text-lg py-2 px-4  font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-[200px] ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleProcessSurvey}
                disabled={processing}
                data-testid="create-survey-button"
              >
                {processing
                  ? isEditMode
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditMode
                    ? 'Update Survey'
                    : 'Create Survey'}
              </button>
            </div>
            <div className="sticky top-0  self-start">
              <Component state={state} nextQuestion={nextQuestion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Summary.propTypes = {
  openComponent: PropTypes.string.isRequired,
  setOpenComponent: PropTypes.func.isRequired,
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
      })
    ).isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.any,
  setNextQuestion: PropTypes.func.isRequired,
};

export default Summary;
