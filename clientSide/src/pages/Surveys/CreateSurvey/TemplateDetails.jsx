import { reducerCases } from '../../../context/constants';
import Radio from '../../Components/Radio';
import ScoreBox from '../../Components/ScoreBox';
import DesignFeedback from '../../Components/DesignFeedback';
import CheckBoxes from '../../Components/CheckBoxes';
import Nps from '../../Components/Nps';
import EmailValidation from '../../Components/EmailValidation';
import Cta from '../../Components/Cta';
import TextAnswer from '../../Components/TextAnswer';
import React from 'react';
import PropTypes from 'prop-types';

const renderComponent = (
  type,
  index,
  handleComponentChange,
  state,
  dispatch
) => {
  const componentMap = {
    nps: (
      <Nps
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
    longTextAnswer: (
      <TextAnswer
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
    email: (
      <EmailValidation
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
    cta: (
      <Cta
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
    checkbox: (
      <CheckBoxes
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
    radio: (
      <Radio
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
    scoreBox: (
      <ScoreBox
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
    designFeedback: (
      <DesignFeedback
        onChange={(newComponent) => handleComponentChange(index, newComponent)}
        components={state.components}
      />
    ),
  };

  return (
    <div
      onMouseEnter={() =>
        dispatch({ type: reducerCases.SET_CURRENT_TYPE, payload: type })
      }
    >
      {componentMap[type]}
    </div>
  );
};

const TemplateDetails = ({ dispatch, state, setNextQuestion }) => {
  const handleComponentChange = (index, newComponent) => {
    const newComponents = [...state.components];
    newComponents[index] = newComponent;
    dispatch({ type: reducerCases.SET_COMPONENTS, payload: newComponents });
  };

  return (
    <div className="flex flex-col gap-[30px]">
      {state.components.map((component, index) => (
        <div key={component.type + index}>
          {renderComponent(
            component.type,
            index,
            handleComponentChange,
            state,
            dispatch,
            setNextQuestion
          )}
        </div>
      ))}
    </div>
  );
};

TemplateDetails.propTypes = {
  template: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    components: PropTypes.arrayOf(PropTypes.object),
  }),
  setNextQuestion: PropTypes.func,
};

export default TemplateDetails;
