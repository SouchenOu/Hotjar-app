import {
  faCheck,
  faChevronDown,
  faChevronLeft,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import React from 'react';
import { reducerCases } from '../../../context/constants';
import Component from '../../Components/Component';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Appearance = ({
  openComponent,
  setOpenComponent,
  state,
  dispatch,
  nextQuestion,
}) => {
  const { language, logo } = state;
  const [customBgColor, setCustomBgColor] = useState('');

  const handleToggle = () => {
    if (openComponent !== 'appearance') {
      setOpenComponent('appearance');
    } else {
      setOpenComponent(null);
    }
  };
  const handleLanguageChange = (event) => {
    dispatch({ type: reducerCases.SET_LANGUAGE, payload: event.target.value });
  };

  const handleBgColorChange = (color) => {
    dispatch({ type: reducerCases.SET_BG_COLOR, payload: color });
  };

  const handleBtnColorChange = (color) => {
    dispatch({ type: reducerCases.SET_BUTTON_COLOR, payload: color });
  };

  const handleTextColorChange = (color) => {
    dispatch({ type: reducerCases.SET_TEXT_COLOR, payload: color });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('logo', file);
      try {
        const response = await fetch(
          `https://pro-1-hk8q.onrender.com/survey/updateLogo`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          dispatch({ type: reducerCases.SET_LOGO, payload: data.logoUrl });
        } else {
          throw new Error('Error uploading logo');
        }
      } catch (error) {
        console.error('Error uploading logo', error);
      }
    }
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
          <h1 className="text-[14px] font-ubuntu font-medium text-gray-800">
            Appearance:
          </h1>
          <div className="hidden lg:flex items-center gap-[10px]">
            <p className="text-[12px] font-medium font-montserrat text-gray-600">
              English,{' '}
            </p>
            <div className="flex items-center gap-[7px]">
              <div className="bg-black border-[2px] w-[14px] h-[14px]"></div>
              <p className="text-[12px] font-medium font-montserrat text-gray-600">
                background,{' '}
              </p>
            </div>
            <div className="flex items-center gap-[7px]">
              <div className="bg-blue-900 border-[2px] w-[14px] h-[14px]"></div>
              <p className="text-[12px] font-medium font-montserrat text-gray-600">
                button
              </p>
            </div>
          </div>
        </div>
        {openComponent !== 'appearance' && (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="w-[17px] h-[17px] cursor-pointe p-2"
            onClick={handleToggle}
          />
        )}
        {openComponent === 'appearance' && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="w-[17px] h-[17px] cursor-pointer P-2"
            onClick={handleToggle}
          />
        )}
      </div>
      <div
        className={classNames(
          'overflow-hidden transition-[max-height] duration-500 ease-in-out',
          {
            'max-h-0': openComponent !== 'appearance',
            'max-h-[1000px]': openComponent === 'appearance',
          }
        )}
      >
        <div className="flex justify-between  items-start p-[10px]">
          <div className="flex flex-col gap-12 w-[50%] bg-white p-8 rounded-lg shadow-lg">
            <div className="relative w-full">
              <select
                className="border-2 text-[14px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-600 w-full"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en" className="font-montserrat">
                  English
                </option>
                <option value="ar" className="font-montserrat">
                  Arabic
                </option>
                <option value="fr" className="font-montserrat">
                  French
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-[16px] text-gray-800 font-semibold font-montserrat">
                Background Color
              </h1>
              <div className="flex gap-2 flex-wrap">
                {[
                  '#FFFFFF',
                  '#000000',
                  '#F0F0F0',
                  '#FFA500',
                  '#FFD700',
                  '#008000',
                  '#0000FF',
                  '#FF0000',
                  '#FFC0CB',
                  '#800080',
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleBgColorChange(color)}
                    className="w-7 h-7 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color }}
                    data-testid={`color-${color}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <input
                  type="color"
                  className="w-7 h-7 p-0 border-2 border-gray-300  cursor-pointer"
                  value={customBgColor}
                  onChange={(e) => setCustomBgColor(e.target.value)}
                />
                <button
                  onClick={() => handleBgColorChange(customBgColor)}
                  className="text-blue-600 underline"
                >
                  Set Custom Color
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-[16px] text-gray-800 font-semibold font-montserrat">
                Button Color
              </h1>
              <div className="flex gap-2 flex-wrap">
                {[
                  '#FFFFFF',
                  '#000000',
                  '#F0F0F0',
                  '#FFA500',
                  '#FFD700',
                  '#008000',
                  '#0000FF',
                  '#FF0000',
                  '#FFC0CB',
                  '#800080',
                ].map((color) => (
                  <div
                    key={color}
                    onClick={() => handleBtnColorChange(color)}
                    className="w-7 h-7 rounded-full border-2 border-gray-300 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-[17px] text-gray-800 font-semibold font-montserrat">
                Text Color
              </h1>
              <div className="flex gap-4">
                {['#FFFFFF', '#000000'].map((color) => (
                  <div
                    key={color}
                    onClick={() => handleTextColorChange(color)}
                    className="w-7 h-7 rounded-full border-2 border-gray-300 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-[6px]">
                <h1 className="text-[17px] font-semibold font-montserrat">
                  Logo
                </h1>
                <p className="text-gray-500 text-[15px] font-montserrat">
                  We’ll rescale logos to 120px height
                </p>
              </div>

              {!logo ? (
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-blue-600 w-4 h-4"
                  />
                  <label
                    aria-label="logo-uploaded"
                    htmlFor="logo-upload"
                    className="px-4 py-2 font-bold text-[13px] bg-blue-600 text-white rounded-lg cursor-pointer transition-all hover:bg-blue-700"
                  >
                    Upload Logo
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-start gap-2">
                  <p
                    data-testid="logo-upload-status"
                    className="text-[13px] text-gray-500"
                  >
                    Logo uploaded
                  </p>
                  <label
                    htmlFor="logo-upload"
                    className="text-blue-600 underline cursor-pointer"
                  >
                    Change Logo
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>

            <button
              className="border-2 border-transparent rounded-xl text-[17px] py-1 px-4 w-[100px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => setOpenComponent('behavior')}
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
  );
};

Appearance.propTypes = {
  openComponent: PropTypes.string,
  setOpenComponent: PropTypes.func,
  state: PropTypes.shape({
    language: PropTypes.string.isRequired,
    logo: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  nextQuestion: PropTypes.any,
  setNextQuestion: PropTypes.func.isRequired,
};

export default Appearance;
