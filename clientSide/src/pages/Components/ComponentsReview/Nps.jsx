import { faBan, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';

const Nps = ({ state, displayMode, component, nextComponent }) => {
  const { bgColor, buttonColor, textColor, logo, language } = state;
  const [openNps, setOpenNps] = useState(true);
  const [score, setScore] = useState(0);

  const handleScoreChange = (event) => {
    setScore(Number(event.target.value));
  };

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text || '';
  };

  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}`;

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
        className={`bg-white border-[2px] border-gray-100 shadow-lg flex flex-col gap-[20px] items-center justify-center overflow-y rounded-xl mb-[3px] ${
          displayMode === 'mobile'
            ? 'w-[400px] h-[670px]'
            : 'w-[500px] h-[680px]'
        }`}
      >
        {openNps && (
          <div
            className="relative flex flex-col items-center justify-start mt-[250px] ml-[90px] transition-all ease-in-out duration-500"
            style={{
              width: displayMode === 'mobile' ? '400px' : '500px',
              height: displayMode === 'mobile' ? '600px' : '600px',
              borderRadius: '15px',
            }}
          >
            <div className="flex flex-col items-center justify-center w-full relative">
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`absolute w-[19px] h-[19px] p-[17px] cursor-pointer mb-[200px] ${
                  displayMode === 'mobile'
                    ? 'ml-[240px] mb-[300px]'
                    : 'ml-[360px] mb-[300px]'
                }`}
                onClick={() => setOpenNps(false)}
                style={{ color: 'black', transition: 'color 0.3s' }}
              />
              <div
                className={`bg-white p-8  rounded-2xl shadow-2xl border-gray-200 border-[1px] w-full max-w-[350px] ${
                  displayMode === 'mobile'
                    ? 'p-6 mr-[36px] mt-[26px]'
                    : 'p-8 ml-[58px] mt-[40px]'
                }`}
                style={{ background: bgColor }}
              >
                <div className="w-full h-[60px] flex items-center justify-center mb-[20px]">
                  {logo && (
                    <img alt="" src={logo} className="w-[40px] h-[40px]" />
                  )}
                </div>

                <div className="overflow-y-auto max-h-[180px] min-h-[50px]">
                  <h1
                    className="text-[18px] min-h-[70px] text-gray-800 font-semibold text-center font-montserrat mb-[15px]"
                    style={{ color: textColor }}
                  >
                    {component.question || ' '}
                  </h1>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={score}
                    onChange={handleScoreChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{
                      background: `linear-gradient(to right, ${buttonColor} ${score * 10}%, #e5e7eb ${score * 10}%)`,
                    }}
                  />
                  <div
                    className="flex justify-between text-[18px] mt-2 w-full px-4"
                    style={{ color: textColor }}
                  >
                    {Array.from({ length: 11 }, (_, i) => (
                      <span
                        key={i}
                        className={`${i === score ? 'text-blue-600 font-bold' : ''}`}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex justify-between text-[14px] mt-1 text-gray-500"
                    style={{ color: textColor }}
                  >
                    <span className="font-montserrat">
                      {component.lowScoreTitle}
                    </span>
                    <span className="font-montserrat">
                      {component.highScoreTitle}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between mt-6">
                  <button
                    className="underline text-[15px] text-gray-700 hover:text-gray-900 transition-all"
                    onClick={nextComponent}
                  >
                    {language === 'en' && 'Skip'}
                    {language === 'ar' && 'تجاوز'}
                    {language === 'fr' && 'Passer'}
                  </button>
                  <button
                    className={`border-2 border-transparent rounded-xl text-[14px] py-2 px-4 w-[100px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                    onClick={nextComponent}
                    style={{ background: score > 0 ? buttonColor : 'gray' }}
                    disabled={score <= 0}
                  >
                    Next
                    {score <= 0 && (
                      <FontAwesomeIcon
                        icon={faBan}
                        className="ml-2 text-red-700"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!openNps && (
          <div
            className="relative flex flex-col items-center justify-center bg-white border-[2px] border-gray-100 rounded-xl"
            style={{
              width: displayMode === 'mobile' ? '300px' : '400px',
              height: displayMode === 'mobile' ? '40px' : '40px',
              top: displayMode === 'mobile' ? '314px' : '320px',
              marginLeft: displayMode === 'mobile' ? '90px' : '100px',
            }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[19px] h-[19px] cursor-pointer ${
                displayMode === 'mobile' ? 'ml-[260px] ' : 'ml-[370px]'
              }`}
              onClick={() => setOpenNps(true)}
            />
            <h1 className="absolute text-[15px] p-[20px] font-bold">
              {truncateText(component.question, 20)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

Nps.propTypes = {
  state: PropTypes.shape({
    bgColor: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    logo: PropTypes.string,
    language: PropTypes.string.isRequired,
  }).isRequired,
  displayMode: PropTypes.oneOf(['mobile', 'desktop']).isRequired,
  component: PropTypes.shape({
    question: PropTypes.string,
    lowScoreTitle: PropTypes.string.isRequired,
    highScoreTitle: PropTypes.string.isRequired,
  }).isRequired,
  nextComponent: PropTypes.func.isRequired,
};

export default Nps;
