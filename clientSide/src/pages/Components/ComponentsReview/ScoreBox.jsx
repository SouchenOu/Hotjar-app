import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ButtonScore } from './data/ButtonScore';
import PropTypes from 'prop-types';
import React from 'react';

const ScoreBox = ({ state, displayMode, component, nextComponent }) => {
  const { bgColor, buttonColor, textColor, logo, language } = state;
  const [openScoreBox, setScoreBox] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState('0');

  const number = ['1', '2', '3', '4', '5'];
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}`;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

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
        className={`bg-white border-[2px] border-gray-100 shadow-lg flex  flex-col gap-[20px] items-center justify-center overflow-y rounded-xl mb-[8px] ${displayMode === 'mobile' ? 'w-[400px] h-[670px]' : 'w-[500px] h-[680px]'}`}
      >
        {openScoreBox && (
          <div
            className="relative flex flex-col items-center justify-start mt-[250px] ml-[90px] transition-all ease-in-out duration-500"
            style={{
              width: displayMode === 'mobile' ? '400px' : '500px',
              height: displayMode === 'mobile' ? '600px' : '600px',
              borderRadius: '15px',
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`absolute w-[19px] h-[19px] p-[17px] cursor-pointer mb-[200px] ${
                  displayMode === 'mobile'
                    ? 'ml-[240px] mb-[200px]'
                    : 'ml-[360px] mb-[220px]'
                }`}
                onClick={() => setScoreBox(false)}
              />
              <div
                className={`bg-white p-[20px]  rounded-2xl shadow-2xl border-gray-200 border-[1px] w-full max-w-[350px] ${
                  displayMode === 'mobile'
                    ? 'p-8 mr-[36px] mt-[60px]'
                    : 'p-8 ml-[58px] mt-[60px]'
                }`}
                style={{ background: bgColor }}
              >
                <div style={{ background: bgColor }}>
                  <div className="w-full h-[60px] flex items-center justify-center mb-[20px]">
                    {logo && (
                      <img alt="" src={logo} className="w-[40px] h-[40px]" />
                    )}
                  </div>

                  <h1
                    className="overflow-y-auto max-h-[60px] min-h-[50px]"
                    style={{ color: textColor }}
                  >
                    {component.question}
                  </h1>

                  <div className="flex items-center justify-center gap-4 mt-4">
                    {number.map((num) => (
                      <span
                        onClick={() => setSelectedNumber(num)}
                        key={num}
                        className={`border-2 rounded-xl px-4 py-2 text-[16px] cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedNumber === num ? 'bg-blue-500 text-white border-blue-700' : 'border-gray-300 text-gray-700'}`}
                      >
                        {num}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex justify-between  max-h-[90px] overflow-auto w-full text-[15px] mt-2 p-[20px]"
                    style={{ color: textColor }}
                  >
                    <span>{component.lowScoreTitle}</span>
                    <span>{component.highScoreTitle}</span>
                  </div>
                </div>

                <ButtonScore
                  displayMode={displayMode}
                  language={language}
                  nextComponent={nextComponent}
                  selectedNumber={selectedNumber}
                  buttonColor={buttonColor}
                />
              </div>
            </div>
          </div>
        )}
        {!openScoreBox && (
          <div
            className="relative flex flex-col items-center justify-center bg-white border-2 border-gray-100 rounded-xl shadow-md"
            style={{
              width: displayMode === 'mobile' ? '350px' : '390px',
              height: '40px',
              top: '316px',
              marginLeft: displayMode === 'mobile' ? '50px' : '110px',
            }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[19px] h-[19px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[260px]' : 'ml-[300px]'}`}
              onClick={() => setScoreBox(true)}
            />
            <h1 className="absolute text-[15px] font-bold truncate w-[250px]">
              {truncateText(component.question, 20)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

ScoreBox.propTypes = {
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
    lowScoreTitle: PropTypes.string.isRequired,
    highScoreTitle: PropTypes.string.isRequired,
  }).isRequired,
  nextComponent: PropTypes.string.isRequired,
};
export default ScoreBox;
