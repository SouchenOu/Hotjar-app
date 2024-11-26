import {
  faCheck,
  faChevronDown,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TemplateDetails from './TemplateDetails';
import Component from '../../Components/Component';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Questions = ({
  openComponent,
  setOpenComponent,
  template,
  dispatch,
  state,
  nextQuestion,
}) => {
  const handleQuestion = () => {
    if (openComponent !== 'Qsm') {
      setOpenComponent('Qsm');
    } else {
      setOpenComponent(null);
    }
  };

  return (
    <div className="flex gap-[20px] ">
      <div className="flex flex-col w-full border-b-[2px]">
        <div
          className="flex items-center w-full justify-between bg-white rounded-lg hover:shadow-lg transition duration-200 ease-in-out shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handleQuestion()}
        >
          <div className="flex items-center gap-3 p-2 w-full">
            <FontAwesomeIcon
              icon={faCheck}
              className="w-3 h-3 p-2 rounded-full text-white"
              style={{ background: 'green' }}
            />
            <div className="flex flex-col">
              <h1 className="text-[14px] text-gray-800 font-ubuntu font-medium text-gray-80">
                Questions:
              </h1>
              <p className="text-[13px] font-medium font-montserrat text-gray-600 ">
                3 Questions
              </p>
            </div>
          </div>
          {openComponent !== 'Qsm' ? (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="w-[17px] h-[17px] cursor-pointer p-2"
              onClick={handleQuestion}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="w-[17px] h-[17px] cursor-pointer p-2"
              onClick={handleQuestion}
            />
          )}
        </div>

        <div
          className={classNames(
            'overflow-hidden transition-[max-height] duration-500 ease-in-out',
            {
              'max-h-0': openComponent !== 'Qsm',
              'max-h-[2000px]': openComponent === 'Qsm',
            }
          )}
        >
          <div className="flex justify-between   py-[60px] items-start">
            <div className="flex flex-col gap-[50px] px-[20px] ">
              <TemplateDetails
                template={template}
                dispatch={dispatch}
                state={state}
              />
              <button
                className="border-2 border-transparent rounded-xl text-[16px] py-2 px-4 w-24 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => setOpenComponent('appearance')}
              >
                Next
              </button>
            </div>

            <div className="sticky top-0 self-start">
              <Component state={state} nextQuestion={nextQuestion} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Questions.propTypes = {
  openComponent: PropTypes.string,
  setOpenComponent: PropTypes.func,
  template: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  nextQuestion: PropTypes.string,
};

export default Questions;
