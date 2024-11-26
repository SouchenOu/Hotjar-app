import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faMobilePhone } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import React from 'react';
import Checkbox from './ComponentsReview/Checkbox';
import Nps from './ComponentsReview/Nps';
import Radio from './ComponentsReview/Radio';
import ScoreBox from './ComponentsReview/ScoreBox';
import DesignFeedback from './ComponentsReview/DesignFeedback';
import LongTextAnswer from './ComponentsReview/TextAnswer';
import Email from './ComponentsReview/Email';
import Cta from './ComponentsReview/Cta';
import PropTypes from 'prop-types';

const Component = ({ state, nextQuestion }) => {
  const { currentType, components, language } = state;
  const compo = components.find((comp) => comp.type === 'checkbox');
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [checkboxStates, setCheckboxStates] = useState(
    new Array(compo.options.length).fill(false)
  );
  const [textInput, setTextInput] = useState('');
  const [displayMode, setDisplayMode] = useState('desktop');

  useEffect(() => {
    if (Array.isArray(components)) {
      const index = components.findIndex((comp) => comp.type === currentType);
      if (index !== -1) {
        setCurrentComponentIndex(index);
      }
    }
  }, [currentType, components]);

  useEffect(() => {
    if (
      components &&
      components.length > 0 &&
      components[currentComponentIndex]
    ) {
      if (
        components[currentComponentIndex].type === 'checkbox' ||
        components[currentComponentIndex].type === 'radio'
      ) {
        setCheckboxStates(
          new Array(components[currentComponentIndex].options.length).fill(
            false
          )
        );
      }
    }
  }, [currentComponentIndex, components]);

  const nextComponent = () => {
    if (currentComponentIndex < components.length - 1) {
      if (nextQuestion !== '') {
        setCurrentComponentIndex(nextQuestion);
      } else {
        setCurrentComponentIndex(currentComponentIndex + 1);
      }
    }
    setCheckboxStates([]);
    setTextInput('');
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleClose = () => {
    setCurrentComponentIndex(0);
  };

  const renderComponent = (component) => {
    switch (component.type) {
      case 'checkbox':
        return (
          <Checkbox
            displayMode={displayMode}
            state={state}
            component={component}
            checkboxStates={checkboxStates}
            setCheckboxStates={setCheckboxStates}
            nextComponent={nextComponent}
          />
        );
      case 'radio':
        return (
          <Radio
            state={state}
            displayMode={displayMode}
            component={component}
            checkboxStates={checkboxStates}
            setCheckboxStates={setCheckboxStates}
            nextComponent={nextComponent}
          />
        );
      case 'nps':
        return (
          <Nps
            state={state}
            displayMode={displayMode}
            component={component}
            nextComponent={nextComponent}
          />
        );
      case 'scoreBox':
        return (
          <ScoreBox
            state={state}
            displayMode={displayMode}
            component={component}
            nextComponent={nextComponent}
          />
        );
      case 'designFeedback':
        return (
          <DesignFeedback
            state={state}
            displayMode={displayMode}
            component={component}
            nextComponent={nextComponent}
          />
        );
      case 'longTextAnswer':
        return (
          <LongTextAnswer
            state={state}
            displayMode={displayMode}
            component={component}
            nextComponent={nextComponent}
            handleTextInputChange={handleTextInputChange}
            textInput={textInput}
          />
        );
      case 'email':
        return (
          <Email
            state={state}
            displayMode={displayMode}
            component={component}
            nextComponent={nextComponent}
          />
        );
      case 'cta':
        return (
          <Cta
            state={state}
            displayMode={displayMode}
            component={component}
            handleClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  const currentComponent =
    components && components.length > 0
      ? components[currentComponentIndex]
      : null;

  return (
    <div
      className={`flex w-full flex-col gap-[60px] ${textDirection === 'rtl' ? 'dir-rtl' : 'dir-ltr'}`}
    >
      {currentComponent && renderComponent(currentComponent)}
      <div className="flex items-center  justify-center  ">
        <div className="flex items-center gap-[15px] shadow-xl ">
          <FontAwesomeIcon
            icon={faDisplay}
            alt=""
            className="w-[15px] h-[15px] absolute px-[20px]"
          />
          <button
            className={`border-[2px] text-[13px] rounded-lg border-gray-400 px-[50px] py-[5px]  hover:bg-gray-100 font-medium  ${displayMode === 'desktop' ? 'border-[2px] bg-gray-200' : 'border-[2px] hover:bg-gray-200'} `}
            onClick={() => setDisplayMode('desktop')}
          >
            Desktop
          </button>
        </div>
        <div className="flex items-center gap-[15px] shadow-xl rounded-lg">
          <FontAwesomeIcon
            icon={faMobilePhone}
            alt=""
            className="w-[15px] h-[15px] absolute px-[20px]"
          />
          <button
            className={`text-[13px] px-[50px] py-[5px] rounded-lg font-medium  ${displayMode === 'mobile' ? 'border-[2px] bg-gray-200' : 'border-[2px] hover:bg-gray-200'}`}
            onClick={() => setDisplayMode('mobile')}
          >
            Mobile
          </button>
        </div>
      </div>
    </div>
  );
};
Component.propTypes = {
  state: PropTypes.shape({
    currentType: PropTypes.string.isRequired,
    components: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
    logo: PropTypes.string,
    language: PropTypes.string.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Component;
