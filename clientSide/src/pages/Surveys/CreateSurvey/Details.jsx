import {
  faCheck,
  faChevronDown,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { reducerCases } from '../../../context/constants';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Details = ({ state, dispatch, openComponent, setOpenComponent }) => {
  const handleToggle = () => {
    if (openComponent !== 'details') {
      setOpenComponent('details');
    } else {
      setOpenComponent(null);
    }
  };

  return (
    <div className="flex flex-col w-full border-b-[2px] ">
      <div
        className="flex items-center w-full justify-between bg-white rounded-lg hover:shadow-lg transition duration-200 ease-in-out shadow-md hover:bg-gray-100 cursor-pointer"
        onClick={() => handleToggle()}
      >
        <div className="flex items-center gap-3 p-2 w-full">
          <FontAwesomeIcon
            icon={faCheck}
            className="w-3 h-3 p-2 rounded-full text-white"
            style={{ background: 'green' }}
          />
          <div className="flex flex-col">
            <h1 className="text-[14px] font-ubuntu font-medium text-gray-800">
              Details:
            </h1>
            <p className="text-[13px] font-medium font-montserrat text-gray-600">
              {state.name}
            </p>
          </div>
        </div>
        {openComponent !== 'details' && (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="w-[17px] h-[17px] text-gray-800 cursor-pointer p-2"
            onClick={handleToggle}
          />
        )}
        {openComponent === 'details' && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="w-[17px] h-[17px] text-gray-800 cursor-pointer p-2"
            onClick={handleToggle}
          />
        )}
      </div>

      <div
        className={classNames(
          'overflow-hidden transition-[max-height] duration-500 ease-in-out',
          {
            'max-h-0': openComponent !== 'details',
            'max-h-[1000px]': openComponent === 'details',
          }
        )}
      >
        <div className="flex flex-col p-[50px] gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="name"
              className="text-[16px] text-gray-800 font-medium font-roboto-slab"
            >
              Name (internal) *
            </label>
            <input
              id="name"
              className="border-2 text-[15px] w-[500px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-300 hover:border-blue-300"
              placeholder=""
              value={state.name}
              onChange={(e) =>
                dispatch({
                  type: reducerCases.SET_NAME,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="description"
              className="text-[16px] text-gray-800 font-medium font-roboto-slab"
            >
              Description
            </label>
            <textarea
              id="description"
              className="border-2 text-[15px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-300 w-[500px] hover:border-blue-300"
              value={state.description}
              onChange={(e) =>
                dispatch({
                  type: reducerCases.SET_DESCRIPTION,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <button
            className="border-2 border-transparent rounded-xl text-[16px] py-2 px-4 w-24 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => setOpenComponent('type')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  openComponent: PropTypes.string.isRequired,
  setOpenComponent: PropTypes.func.isRequired,
};

export default Details;
