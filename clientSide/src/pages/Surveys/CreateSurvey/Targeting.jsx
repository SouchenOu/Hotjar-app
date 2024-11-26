import {
  faCheck,
  faChevronDown,
  faChevronLeft,
  faDisplay,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { reducerCases } from '../../../context/constants';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Targeting = ({
  targetUrlVal,
  isEditMode,
  openComponent,
  setOpenComponent,
  state,
  dispatch,
}) => {
  const { target } = state;
  const [isSpecificPage, setIsSpecificPage] = useState(false);
  const [matchType, setMatchType] = useState('');
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (isEditMode) {
      if (targetUrlVal) {
        setIsSpecificPage(!!targetUrlVal.url);
        setMatchType(targetUrlVal.matchType);
        setUrl(targetUrlVal.url || '');
      } else if (!targetUrlVal) {
        setMatchType(targetUrlVal.matchType);
        setUrl('');
      }
    }
  }, [targetUrlVal, isEditMode]);

  const handleDeviceChange = (device) => {
    const updatedDevices = target.includes(device)
      ? target.filter((d) => d !== device)
      : [...target, device];
    dispatch({ type: reducerCases.SET_TARGET, payload: updatedDevices });
  };

  const handleAllPagesChange = () => {
    setIsSpecificPage(false);
    setMatchType('');
    setUrl('');
    dispatch({
      type: reducerCases.SET_TARGET_URL,
      payload: { url: '', matchType: 'simple' },
    });
  };

  const handleToggle = () => {
    if (openComponent !== 'targeting') {
      setOpenComponent('targeting');
    } else {
      setOpenComponent(null);
    }
  };

  const handleMatchTypeChange = (e) => {
    setMatchType(e.target.value);
    dispatch({
      type: reducerCases.SET_TARGET_URL,
      payload: { url, matchType: e.target.value },
    });
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    dispatch({
      type: reducerCases.SET_TARGET_URL,
      payload: { url: e.target.value, matchType },
    });
  };

  return (
    <div className="flex flex-col border-b-[2px]">
      <div
        className="flex items-center w-full justify-between bg-white rounded-lg  hover:shadow-lg transition duration-200 ease-in-out  shadow-md hover:bg-gray-100 cursor-pointer"
        onClick={() => handleToggle()}
      >
        <div className="flex items-center gap-3 p-2 w-full ">
          <FontAwesomeIcon
            icon={faCheck}
            className="w-3 h-3 p-2 rounded-full text-white"
            style={{ background: 'green' }}
          />
          <div className="flex flex-col">
            <h1 className="text-[14px] font-ubuntu font-medium text-gray-80">
              Targeting:
            </h1>
            <p className="text-[13px] font-medium font-montserrat text-gray-600">
              All devices, all pages, all users
            </p>
          </div>
        </div>
        {openComponent !== 'targeting' ? (
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
            'max-h-0': openComponent !== 'targeting',
            'max-h-[1000px]': openComponent === 'targeting',
          }
        )}
      >
        <div className="flex flex-col p-10 gap-8 hover:bg-gray-100 overflow-y-auto rounded-lg shadow-lg">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-[18px] font-semibold text-gray-800 font-montserrat">
                Devices
              </h1>
              <p className="text-[16px] text-gray-500">
                Select which devices to show this survey on
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  className="cursor-pointer w-4 h-4"
                  type="checkbox"
                  checked={target.includes('desktop')}
                  onChange={() => handleDeviceChange('desktop')}
                />
                <FontAwesomeIcon
                  icon={faDisplay}
                  className="text-gray-700 w-4 h-4"
                />
                <h1 className="text-[15px] font-medium text-gray-700">
                  Desktop
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  className="cursor-pointer w-4 h-4"
                  type="checkbox"
                  checked={target.includes('mobile')}
                  onChange={() => handleDeviceChange('mobile')}
                />
                <FontAwesomeIcon
                  icon={faMobileAlt}
                  className="text-gray-700 w-4 h-4"
                />
                <h1 className="text-[15px] font-medium text-gray-700">
                  Mobile
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-[18px] font-semibold text-gray-800 font-montserrat">
                Pages or Events
              </h1>
              <p className="text-[15px] text-gray-500">
                Select which pages or events to show this survey on
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <input
                className="cursor-pointer w-4 h-4"
                type="checkbox"
                checked={!isSpecificPage}
                onChange={handleAllPagesChange}
              />
              <h1 className="text-[14px] font-medium text-gray-700 font-montserrat">
                All Pages
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <input
                className="cursor-pointer w-4 h-4"
                type="checkbox"
                checked={isSpecificPage}
                onChange={() => setIsSpecificPage(true)}
              />
              <h1 className="text-[14px] font-medium text-gray-700 font-montserrat">
                Specific Pages/Events
              </h1>
            </div>

            {isSpecificPage && (
              <>
                <div className="relative w-full max-w-md">
                  <select
                    id="url-match-select"
                    value={matchType}
                    onChange={handleMatchTypeChange}
                    className="p-2 pr-10 cursor-pointer w-full text-[15px] border rounded-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="simple" className="font-montserrat">
                      Simple URL match
                    </option>
                    <option value="startsWith">URL starts with</option>
                    <option value="endsWith">URL ends with</option>
                    <option value="contains">URL contains</option>
                  </select>
                </div>

                <label className="text-[17px] text-gray-600 mt-4 font-montserrat">
                  Enter URL:
                </label>
                <input
                  type="text"
                  className="p-2 border rounded-lg w-full max-w-md text-[15px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="https://example.com/page"
                  value={url}
                  onChange={handleUrlChange}
                />
              </>
            )}
          </div>

          <button
            className="border-2 border-transparent rounded-xl text-[16px] py-2 px-4 w-24 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => setOpenComponent('summary')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

Targeting.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  openComponent: PropTypes.string,
  setOpenComponent: PropTypes.func,
  state: PropTypes.shape({
    target: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Targeting;
