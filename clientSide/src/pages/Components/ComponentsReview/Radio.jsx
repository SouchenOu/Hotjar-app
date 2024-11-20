import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ButtonCheckBox } from './data/ButtonCheckBox';
import PropTypes from 'prop-types';
import React from 'react';

const Radio = ({
  state,
  displayMode,
  component,
  checkboxStates,
  setCheckboxStates,
  nextComponent,
}) => {
  const { bgColor, buttonColor, textColor, logo, language } = state;
  const [openRadio, setOpenRadio] = useState(true);
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const baseURL = 'http://localhost:8000';
  const logoPath = logo ? `${baseURL}${logo}` : '';
  const handleCheckboxChange = (index) => {
    const updatedCheckboxStates = checkboxStates.map((state, idx) =>
      idx === index ? !state : state
    );
    setCheckboxStates(updatedCheckboxStates);
  };

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
        className={`bg-white border-[2px] border-gray-100  flex flex-col gap-[20px] items-center justify-center overflow-y rounded-2xl shadow-2xl mb-[8px] ${displayMode === 'mobile' ? 'w-[400px] h-[670px]' : 'w-[500px] h-[680px]'}`}
      >
        {openRadio && (
          <div
            className="relative flex flex-col items-center  shadow-2xl gap-[20px] border-[1px] bg-white border-gray-200 ml-[280px] mt-[170px] rounded-2xl"
            style={{
              width: displayMode === 'mobile' ? '300px' : '350px',
              height: displayMode === 'mobile' ? '500px' : '500px',
              background: bgColor,
              marginRight: displayMode === 'mobile' ? '190px' : '130px',
            }}
          >
            {logo && (
              <img
                alt=""
                src={logoPath}
                className="w-[40px] h-[40px] mt-[6px]"
              />
            )}
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[20px] h-[20px] p-[17px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[270px]' : 'ml-[280px]'}`}
              onClick={() => setOpenRadio(false)}
            />
            <h1
              className="text-[16px] p-[20px] font-bold font-montserrat"
              style={{ color: textColor }}
            >
              {component.question}
            </h1>
            <div
              className="relative flex flex-col gap-[7px] items-center overflow-y-auto w-full"
              style={{
                height: displayMode === 'mobile' ? '300px' : '400px',
                maxHeight: 'calc(60% - 60px)',
              }}
            >
              {component.options.map((option, index) => (
                <div
                  key={index}
                  className="flex gap-[7px] items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    className="absolute hidden peer"
                    checked={checkboxStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className={`absolute w-4 h-4 flex items-center justify-center ${language === 'ar' ? 'mr-[10px]' : 'ml-[20px]'} rounded-full border-2 border-gray-600 cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500`}
                  ></label>
                  <span
                    className={`border-[2px] font-montserrat hover:border-blue-100 border-gray-400 shadow-xl rounded-2xl text-[13px] ${option ? '' : 'text-gray-400'} ${displayMode === 'mobile' ? 'w-[230px] px-[50px] py-[10px]' : 'w-[300px] px-[60px] py-[10px]'}`}
                    style={{ color: textColor }}
                  >
                    {option || 'Enter option text here'}
                  </span>
                </div>
              ))}
            </div>
            <ButtonCheckBox
              language={language}
              nextComponent={nextComponent}
              buttonColor={buttonColor}
              checkboxStates={checkboxStates}
            />
          </div>
        )}
        {!openRadio && (
          <div
            className="relative p-[20px] flex flex-col items-center justify-center bg-white border-[2px] ml-[280px] border-gray-100 rounded-xl"
            style={{
              width: displayMode === 'mobile' ? '300px' : '350px',
              height: displayMode === 'mobile' ? '30px' : '30px',
              top: displayMode === 'mobile' ? '314px' : '315px',
              marginRight: displayMode === 'mobile' ? '190px' : '130px',
            }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[20px] h-[20px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[270px]' : 'ml-[300px]'}`}
              onClick={() => setOpenRadio(true)}
            />
            <h1 className="text-[15px] text-gray-800 absolute font-bold">
              {truncateText(component.question, 20)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

Radio.propTypes = {
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
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  checkboxStates: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setCheckboxStates: PropTypes.func.isRequired,
  nextComponent: PropTypes.func.isRequired,
};

export default Radio;
