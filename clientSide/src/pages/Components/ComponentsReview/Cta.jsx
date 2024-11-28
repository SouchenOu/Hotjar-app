import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';

const Cta = ({ state, displayMode, component, handleClose }) => {
  const { bgColor, buttonColor, textColor, logo, language } = state;
  const [openCta, setOpenCta] = useState(true);
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const baseURL = `https://hotjar-app.onrender.com`;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div
      className={`bg-gray-100 flex flex-col gap-[20px] items-center justify-center border-gray-100 overflow-y rounded-xl shadow-xl ${
        displayMode === 'mobile'
          ? 'w-[450px] h-[750px] ml-[10px]'
          : 'w-[520px] h-[750px]'
      }`}
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
        className={`bg-white border-[2px]  border-gray-100 shadow-lg flex flex-col gap-[20px] items-center justify-center  rounded-xl mb-[3px] ${
          displayMode === 'mobile'
            ? 'w-[400px] h-[670px]'
            : 'w-[500px] h-[680px]'
        }`}
      >
        {openCta && (
          <div
            className="relative flex flex-col items-center p-[20px] justify-start  ml-[90px] transition-all ease-in-out duration-500"
            style={{
              width: displayMode === 'mobile' ? '400px' : '500px',
              height: displayMode === 'mobile' ? '600px' : '400px',
              marginTop: displayMode === 'mobile' ? '390px' : '390px',
              borderRadius: '15px',
            }}
          >
            <div className="flex flex-col items-center justify-center w-full relative">
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`absolute w-[19px] h-[19px] p-[17px] cursor-pointer mb-[130px] ${
                  displayMode === 'mobile'
                    ? 'ml-[240px] mb-[160px]'
                    : 'ml-[360px] mb-[160px]'
                }`}
                onClick={() => setOpenCta(false)}
                style={{ color: 'black', transition: 'color 0.3s' }}
              />
              <div
                className={`bg-white   rounded-2xl p-[30px] shadow-2xl border-gray-200 border-[1px] w-full max-w-[350px] ${
                  displayMode === 'mobile'
                    ? 'p-6 mr-[36px] mt-[26px]'
                    : 'p-8 ml-[58px] mt-[40px]'
                }`}
                style={{ background: bgColor }}
              >
                <div className="flex items-center justify-center">
                  {logo && (
                    <img alt="" src={logo} className="w-[40px] h-[40px]" />
                  )}
                </div>
                <h1
                  className="text-[15px] text-gray-800 max-h-[130px] overflow-y-auto overflow-x-hidden  min-h-[120px] font-semibold p-[30px] font-montserrat"
                  style={{ color: textColor }}
                >
                  {component.question}
                </h1>

                {language === 'en' && (
                  <button
                    className={`border-2 border-transparent ml-[110px] rounded-xl text-[14px] py-1 px-4 w-[70px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
                    onClick={handleClose}
                    style={{ background: buttonColor }}
                  >
                    Close
                  </button>
                )}
                {language === 'ar' && (
                  <button
                    className={`border-2 border-transparent mr-[110px] rounded-xl [15px] py-1 px-4 w-[70px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
                    onClick={handleClose}
                    style={{ background: buttonColor }}
                  >
                    اغلق
                  </button>
                )}
                {language === 'fr' && (
                  <button
                    className={`border-2 border-transparent ml-[110px] rounded-xl [15px] py-1 px-4 w-[70px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
                    onClick={handleClose}
                    style={{ background: buttonColor }}
                  >
                    fermer
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {!openCta && (
          <div
            className="relative flex flex-col items-center justify-center bg-white border-[2px] border-gray-200 rounded-xl"
            style={{
              width: displayMode === 'mobile' ? '300px' : '340px',
              height: displayMode === 'mobile' ? '40px' : '40px',
              top: displayMode === 'mobile' ? '315px' : '315px',
              marginLeft: displayMode === 'mobile' ? '90px' : '160px',
            }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[19px] h-[19px] text-gray-800 cursor-pointer ${displayMode === 'mobile' ? 'ml-[270px]' : 'ml-[300px]'}`}
              onClick={() => setOpenCta(true)}
            />
            <h1 className="absolute text-[14px] text-gray-800 p-[3px] font-bold">
              {truncateText(component.question, 20)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

Cta.propTypes = {
  state: PropTypes.shape({
    bgColor: PropTypes.string,
    buttonColor: PropTypes.string,
    textColor: PropTypes.string,
    logo: PropTypes.string,
    language: PropTypes.oneOf(['en', 'ar', 'fr']).isRequired,
  }).isRequired,
  displayMode: PropTypes.oneOf(['mobile', 'desktop']).isRequired,
  component: PropTypes.shape({
    question: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Cta;
