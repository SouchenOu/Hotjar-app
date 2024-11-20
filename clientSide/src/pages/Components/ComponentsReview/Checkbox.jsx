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
  const baseURL = 'https://pro1-ubq1.onrender.com';
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
        className={`bg-white border-[2px] border-gray-100 shadow-lg flex flex-col gap-[20px] items-center justify-center overflow-y rounded-xl mb-[8px] ${displayMode === 'mobile' ? 'w-[400px] h-[670px]' : 'w-[500px] h-[680px]'}`}
      >
        {openCheckbox && (
          <div
            className="relative flex flex-col items-center gap-[20px] border-[1px] bg-white border-gray-300 ml-[240px] mt-[170px] rounded-xl"
            style={{
              width: displayMode === 'mobile' ? '340px' : '350px',
              height: displayMode === 'mobile' ? '500px' : '500px',
              background: bgColor,
              marginRight: displayMode === 'mobile' ? '190px' : '130px',
            }}
          >
            {logo && (
              <img
                alt=""
                src={logoPath}
                className="w-[40px] h-[40px] mt-[30px]"
              />
            )}
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`w-[19px] h-[19px] p-[17px] cursor-pointer ${displayMode === 'mobile' ? 'ml-[300px]' : 'ml-[300px]'}`}
              onClick={() => setOpenCheckbox(false)}
            />
            <h1
              className="text-[15px] p-[20px] font-bold"
              style={{ color: textColor }}
            >
              {component.question}
            </h1>
            <div
              className="  relative flex flex-col gap-[7px] items-center overflow-y-auto w-full"
              style={{ maxHeight: 'calc(100% - 100px)' }}
            >
              {component.options.map((option, index) => (
                <div
                  key={index}
                  className="flex gap-[7px] items-center cursor-pointer"
                >
                  <input
                    className={`absolute w-[40px] h-[20px]`}
                    type="checkbox"
                    checked={checkboxStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span
                    className={`border-[2px] font-montserrat hover:border-blue-100 border-gray-600  shadow-xl  rounded-2xl text-[14px] ${option ? '' : 'text-gray-400'} ${displayMode === 'mobile' ? 'w-[280px] px-[50px] py-[1px] ' : 'w-[280px] px-[50px] py-[1px]  '}`}
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

// Define prop types
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
  nextComponent: PropTypes.object.isRequired,
};

export default Checkbox;
