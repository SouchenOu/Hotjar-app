import {
  faCheck,
  faChevronDown,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { reducerCases } from '../../../context/constants';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Behavior = ({ openComponent, setOpenComponent, dispatch, state }) => {
  const handleToggle = () => {
    if (openComponent === 'behavior') {
      setOpenComponent(null);
    } else {
      setOpenComponent('behavior');
    }
  };

  const handleChangeTiming = (e) => {
    dispatch({ type: reducerCases.SET_TIMING, payload: e.target.value });
    if (state.timing.type !== 'delay') {
      dispatch({ type: reducerCases.SET_DELAY_TIME, payload: 0 });
    }
  };
  const handleChangeFrequency = (e) => {
    dispatch({ type: reducerCases.SET_FREQUENCY, payload: e.target.value });
  };
  const handleDelayTimeChange = (e) => {
    dispatch({ type: reducerCases.SET_DELAY_TIME, payload: e.target.value });
  };

  return (
    <div className="flex flex-col border-b-[2px]">
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
          <div className="flex flex-col">
            <h1 className="text-[14px] font-ubuntu font-medium text-gray-800">
              Behavior:
            </h1>
            <p className="text-[13px] font-medium font-montserrat text-gray-600">
              Shown immediately, multiple responses
            </p>
          </div>
        </div>
        {openComponent !== 'behavior' ? (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="w-[17px] h-[17px] cursor-pointer p-2"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="w-[17px] h-[17px] cursor-pointer p-2"
          />
        )}
      </div>
      <div
        className={classNames(
          'overflow-hidden transition-[max-height] duration-500 ease-in-out',
          {
            'max-h-0': openComponent !== 'behavior',
            'max-h-[1000px]': openComponent === 'behavior',
          }
        )}
      >
        <div className="flex flex-col p-10 gap-10 bg-white overflow-y-auto rounded-lg shadow-lg">
          <div className="flex flex-col gap-4">
            <div className="gap-3">
              <h1 className="text-[17px] font-bold text-gray-900 font-montserrat">
                Timing
              </h1>
              <p className="text-[14px] text-gray-500 font-montserrat">
                Select when to show this survey to users
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 mt-5">
                <input
                  type="radio"
                  value="immediate"
                  checked={state.timing.type === 'immediate'}
                  onChange={handleChangeTiming}
                  className="cursor-pointer border-2 border-gray-300 rounded-full w-5 h-5 focus:ring-blue-500"
                />
                <p className="text-[15px]">Immediately after the page loads</p>
              </label>

              <label className="flex items-center gap-3 mt-5">
                <input
                  type="radio"
                  value="delay"
                  checked={state.timing.type === 'delay'}
                  onChange={handleChangeTiming}
                  className="cursor-pointer border-2 border-gray-300 rounded-full w-5 h-5 focus:ring-blue-500"
                />
                <p className="text-[15px]">After a delay on the page</p>
              </label>

              {state.timing.type === 'delay' && (
                <div className="flex items-center gap-3 mt-2 pl-8">
                  <label className=" text-gray-600 text-[15px]">
                    Enter delay time (in seconds):
                  </label>
                  <input
                    type="number"
                    value={state.delayTime}
                    onChange={handleDelayTimeChange}
                    className="border-2 border-gray-300 rounded-lg w-16 text-base p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <label className="flex items-center gap-3 mt-5">
                <input
                  type="radio"
                  value="scroll"
                  checked={state.timing.type === 'scroll'}
                  onChange={handleChangeTiming}
                  className="cursor-pointer border-2 border-gray-300 rounded-full w-5 h-5 focus:ring-blue-500"
                />
                <p className="text-[15px]">
                  When a user scrolls halfway down the page
                </p>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="gap-3">
              <h1 className="text-[17px] font-bold text-gray-900 font-montserrat">
                Frequency
              </h1>
              <p className="text-[14px] text-gray-500">
                Select how often users should see this survey
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  value="once"
                  checked={state.frequency.type === 'once'}
                  onChange={handleChangeFrequency}
                  className="cursor-pointer border-2 border-gray-300 rounded-full w-5 h-5 focus:ring-blue-500"
                />
                <div className="flex flex-col">
                  <p className="text-[15px]">
                    Only once, even if they don&apos;t respond
                  </p>
                  <p className="text-base text-gray-400">
                    If users close the survey, they won&apos;t see it again
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  value="submit"
                  checked={state.frequency.type === 'submit'}
                  onChange={handleChangeFrequency}
                  className="cursor-pointer border-2 border-gray-300 rounded-full w-5 h-5 focus:ring-blue-500"
                />
                <div className="flex flex-col">
                  <p className="text-[15px]">Until they submit a response</p>
                  <p className="text-base text-gray-400">
                    If users minimize the survey without responding, it will
                    show again in the next session
                  </p>
                </div>
              </label>

              <label className="flex  items-center gap-3">
                <input
                  type="radio"
                  value="always"
                  checked={state.frequency.type === 'always'}
                  onChange={handleChangeFrequency}
                  className="cursor-pointer border-2 border-gray-300 rounded-full w-5 h-5 focus:ring-blue-500"
                />
                <div className="flex flex-col">
                  <p className="text-[15px]">
                    Always, even if they don&apos;t submit a response
                  </p>
                  <p className="text-base text-gray-400">
                    If users minimize the survey or respond, it will still show
                    again in the next session
                  </p>
                </div>
              </label>
            </div>
          </div>

          <button
            className="border-2 border-transparent rounded-xl text-[16px] py-2 px-4 w-24 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => setOpenComponent('targeting')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

Behavior.propTypes = {
  openComponent: PropTypes.string.isRequired,
  setOpenComponent: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    timing: PropTypes.shape({
      type: PropTypes.oneOf(['immediate', 'delay', 'scroll']).isRequired,
    }).isRequired,
    frequency: PropTypes.shape({
      type: PropTypes.oneOf(['once', 'submit', 'always']).isRequired,
    }).isRequired,
    delayTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default Behavior;
