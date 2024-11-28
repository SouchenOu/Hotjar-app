import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonCheckBox } from './data/ButtonCheckBox';

const Checkbox = ({
  displayMode,
  state,
  component,
  checkboxStates,
  setCheckboxStates,
  nextComponent,
}) => {
  const { bgColor, buttonColor, textColor, logo, language } = state;

  const [openCheckbox, setOpenCheckbox] = useState(true);
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const baseURL = `https://hotjar-app.onrender.com`;

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
        className={`bg-white border-[2px] border-gray-100 shadow-lg flex flex-col gap-[20px] items-center justify-center overflow-y rounded-xl mb-[3px] ${
          displayMode === 'mobile'
            ? 'w-[400px] h-[670px]'
            : 'w-[500px] h-[680px]'
        }`}
      >
        {openCheckbox && (
          <div
            className="relative flex flex-col items-center justify-start mt-[60px] ml-[90px] transition-all ease-in-out duration-500"
            style={{
              width: displayMode === 'mobile' ? '400px' : '500px',
              height: displayMode === 'mobile' ? '600px' : '600px',
              borderRadius: '15px',
            }}
          >
            <div className="flex flex-col items-center justify-center w-full relative">
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`absolute w-[19px] h-[19px] p-[17px] cursor-pointer mb-[500px] ${
                  displayMode === 'mobile'
                    ? 'ml-[240px] mb-[300px]'
                    : 'ml-[360px] mb-[500px]'
                }`}
                onClick={() => setOpenCheckbox(false)}
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

                <div className="overflow-y-auto max-h-[70px] min-h-[50px]">
                  <h1
                    className="text-[18px] min-h-[40px] text-gray-800 font-semibold text-center font-montserrat mb-[15px]"
                    style={{ color: textColor }}
                  >
                    {component.question || ' '}
                  </h1>
                </div>
                <div
                  className="relative flex flex-col gap-[7px] items-center overflow-y-auto overflow-x-hidden  w-full"
                  style={{ height: '300px' }}
                >
                  {component.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex gap-[10px] border-[2px] p-2  font-montserrat hover:border-green-100 border-gray-600 shadow-xl rounded-2xl items-center cursor-pointer"
                    >
                      <input
                        className="w-[20px] h-[20px]"
                        type="checkbox"
                        checked={checkboxStates[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span
                        className={`text-[14px] flex items-center justify-center ${
                          option ? '' : 'text-gray-400'
                        }`}
                        style={{
                          width: '210px',
                          color: textColor,
                          whiteSpace: 'normal',
                          textOverflow: 'ellipsis',
                          maxHeight: '60px',
                          overflowY: 'auto',
                        }}
                      >
                        {option || 'Enter optionnnn text here'}
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
            </div>
          </div>
        )}
        {!openCheckbox && (
          <div
            className=" relative p-[20px] flex flex-col items-center justify-center  bg-white border-[2px] border-gray-100 rounded-xl"
            style={{
              width: displayMode === 'mobile' ? '340px' : '350px',
              height: displayMode === 'mobile' ? '30px' : '30px',
              top: displayMode === 'mobile' ? '314px' : '315px',
              marginLeft: displayMode === 'mobile' ? '50px' : '150px',
            }}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={` w-[19px] h-[19px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[300px]' : 'ml-[300px]'}`}
              onClick={() => setOpenCheckbox(true)}
            />
            <h1 className="text-[15px] absolute font-bold">
              {truncateText(component.question, 20)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  displayMode: PropTypes.string.isRequired,
  state: PropTypes.shape({
    bgColor: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    logo: PropTypes.string,
    language: PropTypes.string.isRequired,
  }).isRequired,
  component: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  checkboxStates: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setCheckboxStates: PropTypes.func.isRequired,
  nextComponent: PropTypes.func.isRequired,
};

export default Checkbox;
