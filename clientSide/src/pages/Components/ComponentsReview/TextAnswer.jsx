import { faBan, faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';

const LongTextAnswer = ({
  state,
  displayMode,
  component,
  nextComponent,
  handleTextInputChange,
  textInput,
}) => {
  const { bgColor, buttonColor, textColor, logo, language } = state;
  const [openLongTextAnswer, setOpenLongTextAnswer] = useState(true);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const baseURL = `https://hotjar-app.onrender.com`;

  return (
    <div
      className={`bg-gray-100 flex flex-col gap-[20px] items-center justify-center border-gray-100 overflow-y rounded-xl shadow-xl ${displayMode === 'mobile' ? 'w-[450px] h-[750px] ml-[10px]' : 'w-[520px] h-[750px]'}`}
      dir={textDirection}
    >
      <div
        className={`top-0 left-0 right-0 w-full bg-gray-800 p-2 rounded-t-xl flex items-center justify-between`}
      >
        <div className="flex gap-2">
          <span className="bg-green-500 w-3 h-3 rounded-full cursor-pointer" />
          <span className="bg-yellow-500 w-3 h-3 rounded-full cursor-pointer" />
          <span className="bg-red-500 w-3 h-3 rounded-full cursor-pointer" />
        </div>
      </div>

      <div
        className={`bg-white border-[2px] border-gray-100  shadow-lg flex flex-col gap-[20px] items-center justify-center overflow-y  rounded-xl mb-[3px] ${displayMode === 'mobile' ? 'w-[400px] h-[680px]' : 'w-[500px] h-[680px]'}`}
      >
        {openLongTextAnswer && (
          <div
            className="relative flex flex-col shadow-2xl items-center overflow-y-auto overflow-x-hidden  gap-[20px] border-[1px] bg-white border-gray-200 ml-[280px] mt-[179px] rounded-2xl"
            style={{
              width: displayMode === 'mobile' ? '300px' : '350px',
              height: displayMode === 'mobile' ? '600px' : '600px',
              background: bgColor,
              marginRight: displayMode === 'mobile' ? '190px' : '150px',
            }}
          >
            <div className="flex flex-col items-center    justify-center gap-[10px]">
              {logo && (
                <img
                  alt=""
                  src={logo}
                  className="w-[40px] h-[40px] mt-[15px]"
                />
              )}
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`w-[19px] h-[19px] p-[17px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[270px]' : 'ml-[300px]'}`}
                onClick={() => setOpenLongTextAnswer(false)}
              />
              <h1
                className="text-[16px] font-semibold p-[20px] font-montserrat"
                style={{ color: textColor }}
              >
                {component.question}
              </h1>
              <textarea
                placeholder="Please type here.."
                className={`focus:ring-2 focus:ring-gray-400 max-w-[100px]  ease-in-out focus:outline-none hover:border-gray-600 block rounded-md px-[20px] py-[10px] text-[15px] border-gray-300 border-[2px] shadow-sm ${displayMode === 'mobile' ? 'w-[270px]' : 'w-[300px]'}`}
                style={{
                  minHeight: '150px',
                  maxWidth: displayMode === 'mobile' ? '270px' : '300px',
                  overflowX: 'hidden',
                  resize: 'vertical',
                  wordWrap: 'break-word',
                }}
                value={textInput}
                onChange={handleTextInputChange}
              />
            </div>
            <div className="flex items-center gap-[20px] justify-center   mt-6">
              {language === 'en' && (
                <button
                  className="underline text-[15px]  text-gray-700 hover:text-gray-900 transition-all"
                  onClick={nextComponent}
                >
                  Skip
                </button>
              )}
              {language === 'ar' && (
                <button
                  className="underline text-[15px]  text-gray-700 hover:text-gray-900 transition-all"
                  onClick={nextComponent}
                >
                  تجاوز
                </button>
              )}
              {language === 'fr' && (
                <button
                  className="underline text-[15px]  text-gray-700 hover:text-gray-900 transition-all"
                  onClick={nextComponent}
                >
                  Passer
                </button>
              )}

              {language === 'en' && (
                <button
                  className={`border-2 border-transparent   rounded-xl text-[13px] py-1 px-4 w-30 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
                  onClick={nextComponent}
                  style={{
                    background: textInput.trim() === '' ? 'gray' : buttonColor,
                  }}
                  disabled={textInput.trim() === ''}
                >
                  Next{' '}
                  {textInput.trim() === '' && (
                    <FontAwesomeIcon
                      icon={faBan}
                      className="ml-[10px] text-red-700"
                    />
                  )}
                </button>
              )}
              {language === 'fr' && (
                <button
                  className={`border-2 border-transparent  rounded-xl text-[13px] py-1 px-4 w-30 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
                  onClick={nextComponent}
                  style={{
                    background: textInput.trim() === '' ? 'gray' : buttonColor,
                  }}
                  disabled={textInput.trim() === ''}
                >
                  Suivant{' '}
                  {textInput.trim() === '' && (
                    <FontAwesomeIcon
                      icon={faBan}
                      className="ml-[10px] text-red-700"
                    />
                  )}
                </button>
              )}
              {language === 'ar' && (
                <button
                  className={`border-2 border-transparent rounded-xl text-[13px] py-1 px-4 w-30 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
                  onClick={nextComponent}
                  style={{
                    background: textInput.trim() === '' ? 'gray' : buttonColor,
                  }}
                  disabled={textInput.trim() === ''}
                >
                  التالي{' '}
                  {textInput.trim() === '' && (
                    <FontAwesomeIcon
                      icon={faBan}
                      className="ml-[10px] text-red-700"
                    />
                  )}
                </button>
              )}
            </div>
          </div>
        )}
        {!openLongTextAnswer && (
          <div
            className="relative flex flex-col bg-white border-[2px] border-gray-100 rounded-xl "
            style={{
              width: displayMode === 'mobile' ? '300px' : '350px',
              height: displayMode === 'mobile' ? '40px' : '40px',
              top: displayMode === 'mobile' ? '318px' : '320px',
              marginLeft: displayMode === 'mobile' ? '90px' : '140px',
            }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[19px] h-[19px]  py-[10px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[260px]' : 'ml-[300px]'}`}
              onClick={() => setOpenLongTextAnswer(true)}
            />
            <h1 className="absolute text-[14px] text-gray-800 px-[30px] py-[10px] font-bold">
              {truncateText(component.question, 20)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

LongTextAnswer.propTypes = {
  state: PropTypes.shape({
    bgColor: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    logo: PropTypes.string,
    language: PropTypes.string.isRequired,
  }).isRequired,
  displayMode: PropTypes.oneOf(['mobile', 'desktop']).isRequired,
  component: PropTypes.shape({
    question: PropTypes.string.isRequired,
  }).isRequired,
  nextComponent: PropTypes.func.isRequired,
  handleTextInputChange: PropTypes.func.isRequired,
  textInput: PropTypes.string.isRequired,
};

export default LongTextAnswer;
