import {
  faCheck,
  faChevronDown,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Component from '../../Components/Component';
import React from 'react';
import PropTypes from 'prop-types';
const Type = ({
  openComponent,
  setOpenComponent,
  state,
  nextQuestion,
  setNextQuestion,
}) => {
  const handleToggle = () => {
    if (openComponent !== 'type') {
      setOpenComponent('type');
    } else {
      setOpenComponent(null);
    }
  };
  return (
    <div className="flex flex-col border-b-[2px]">
      <div className="flex flex-col gap-[20px]">
        <div
          className="flex items-center w-full  justify-between bg-white rounded-lg  hover:shadow-lg transition duration-200 ease-in-out  shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handleToggle()}
        >
          <div className="flex items-center gap-3 p-2 w-full  ">
            <FontAwesomeIcon
              icon={faCheck}
              className="w-3 h-3 p-2 rounded-full text-white"
              style={{ background: 'green' }}
            />{' '}
            <div className="flex flex-col">
              <h1 className="text-[14px] font-ubuntu font-medium text-gray-800">
                Type:
              </h1>
              <p className="text-[13px] font-medium font-montserrat text-gray-600">
                Popover
              </p>
            </div>
          </div>
          {openComponent !== 'type' && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="p-2 w-[17px] h-[17px] text-gray-800 cursor-pointer"
              onClick={handleToggle}
            />
          )}
          {openComponent === 'type' && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="p-2 w-[17px] h-[17px] text-gray-800 cursor-pointer"
              onClick={handleToggle}
            />
          )}
        </div>
        {openComponent === 'type' && (
          <div className="p-[20px] flex items-center justify-between ">
            <div className="flex flex-col gap-[200px] px-[20px]">
              <div className="flex flex-wrap gap-8 justify-center">
                <div className="flex flex-col items-center rounded-xl justify-center gap-5 border-2 hover:border-2 hover:border-gray-500 border-gray-300 transition duration-200 p-5 w-72 h-70 cursor-pointer bg-white shadow-md">
                  <h1 className="text-[18px] text-gray-800 font-medium font-roboto-slab">
                    Popover
                  </h1>
                  <p className="text-[15px] text-gray-500 font-montserrat text-center">
                    A popover can contain buttons, forms, or other interactive
                    elements, allowing users to take action directly from the
                    popover. This is common in settings menus or actions related
                    to a particular item.
                  </p>
                  <span className="rounded-full flex items-center justify-center border-2 border-gray-500 w-8 h-8">
                    <div className="rounded-full bg-blue-900 w-4 h-4"></div>
                  </span>
                </div>
              </div>
              <button
                className="border-2 border-transparent mt-[200px] rounded-xl text-[16px] py-2 px-4 w-24 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => setOpenComponent('Qsm')}
              >
                Next
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

Type.propTypes = {
  openComponent: PropTypes.string,
  setOpenComponent: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  nextQuestion: PropTypes.any,
  setNextQuestion: PropTypes.func.isRequired,
};

export default Type;
