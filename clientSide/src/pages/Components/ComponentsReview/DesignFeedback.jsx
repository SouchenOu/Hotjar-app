import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import React from 'react';
import { ButtonScore } from './data/ButtonScore';
import PropTypes from 'prop-types';

const DesignFeedback = ({ state, displayMode, component, nextComponent }) => {
  const { bgColor, buttonColor, textColor, logo, language, ImageFeedback } =
    state;
  const [openDesign, setOpenDesign] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState('0');

  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const baseURL = `https://hotjar-app.onrender.com`;

  const number = ['1', '2', '3', '4', '5'];
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  let imagePath = '';
  if (component && component.image) {
    imagePath = `${component.image}`;
  }

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
        className={`bg-white border-[2px] border-gray-100 shadow-lg flex flex-col gap-[20px] items-center justify-center overflow-y rounded-xl mb-[8px] ${displayMode === 'mobile' ? 'w-[400px] h-[670px]' : 'w-[500px] h-[680px]'}`}
      >
        {openDesign && (
          <div
            className="relative flex flex-col items-center justify-start  ml-[90px] transition-all ease-in-out duration-500"
            style={{
              width: displayMode === 'mobile' ? '400px' : '500px',
              height: displayMode === 'mobile' ? '600px' : '300px',
              marginTop: displayMode === 'mobile' ? '30px' : '120px',
              borderRadius: '15px',
            }}
          >
            <div
              className={`bg-white p-[20px]  rounded-2xl shadow-2xl border-gray-200 border-[1px] w-full max-w-[350px] ${
                displayMode === 'mobile'
                  ? 'p-8 mr-[36px] mt-[-60px]'
                  : 'p-8 ml-[58px] mt-[-250px]'
              }`}
              style={{ background: bgColor }}
            >
              <div className="w-full h-[60px] flex items-center justify-center mb-[20px]">
                {logo && (
                  <img alt="" src={logo} className="w-[40px] h-[40px]" />
                )}
              </div>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`w-[19px] h-[19px]   cursor-pointer ${displayMode === 'mobile' ? 'ml-[290px]' : 'ml-[260px]'}`}
                onClick={() => setOpenDesign(false)}
              />
              <h1
                className="overflow-y-auto max-h-[60px] min-h-[50px]"
                style={{ color: textColor }}
              >
                {component.question}
              </h1>
              {ImageFeedback ? (
                <div className="flex justify-center items-center">
                  <img
                    src={ImageFeedback}
                    className="w-full h-[300px]  object-contain"
                    alt="Website Screenshot"
                  />
                </div>
              ) : (
                <div
                  className="flex justify-center items-center"
                  style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#f0f0f0',
                    border: '1px dashed #ccc',
                  }}
                >
                  <span className="text-gray-500">No Image Available</span>{' '}
                </div>
              )}
              <div className="flex items-center p-[20px] justify-center gap-[20px]">
                {number.map((num) => (
                  <span
                    onClick={() => setSelectedNumber(num)}
                    key={num}
                    className={`border-[2px]  rounded-xl border-gray-300 px-[12px] py-[4px] text-[20px] cursor-pointer transition-all duration-300 ${selectedNumber === num ? 'bg-blue-300 border-blue-500 ' : 'border-gray-300 text-black'}`}
                  >
                    {num}
                  </span>
                ))}
              </div>
              <div
                className="flex justify-between max-h-[90px] overflow-auto text-[15px] mt-1 p-1 text-gary-200"
                style={{ color: textColor }}
              >
                <span>{component.lowScoreTitle}</span>
                <span>{component.highScoreTitle}</span>
              </div>
              <div className="px-[50px]">
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
        {!openDesign && (
          <div
            className="relative flex flex-col items-center justify-center bg-white border-[2px] border-gray-100 rounded-xl"
            style={{
              width: displayMode === 'mobile' ? '300px' : '360px',
              height: displayMode === 'mobile' ? '37px' : '40px',
              top: displayMode === 'mobile' ? '314px' : '320px',
              marginLeft: displayMode === 'mobile' ? '90px' : '130px',
            }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[19px] h-[19px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[270px]' : 'ml-[330px]'}`}
              onClick={() => setOpenDesign(true)}
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

DesignFeedback.propTypes = {
  state: PropTypes.shape({
    bgColor: PropTypes.string,
    buttonColor: PropTypes.string,
    textColor: PropTypes.string,
    logo: PropTypes.string,
    language: PropTypes.oneOf(['en', 'ar']),
  }),
  displayMode: PropTypes.oneOf(['mobile', 'desktop']),
  component: PropTypes.shape({
    question: PropTypes.string.isRequired,
    image: PropTypes.string,
    lowScoreTitle: PropTypes.string,
    highScoreTitle: PropTypes.string,
  }),
  nextComponent: PropTypes.func.isRequired,
};

export default DesignFeedback;
