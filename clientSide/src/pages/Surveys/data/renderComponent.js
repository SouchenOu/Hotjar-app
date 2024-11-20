import { reducerCases } from '../../../context/constants';
import CheckBoxes from '../../Components/CheckBoxes';
import Cta from '../../Components/Cta';
import DesignFeedback from '../../Components/DesignFeedback';
import EmailValidation from '../../Components/EmailValidation';
import Nps from '../../Components/Nps';
import Radio from '../../Components/Radio';
import ScoreBox from '../../Components/ScoreBox';
import TextAnswer from '../../Components/TextAnswer';
import { React } from 'react';

export const renderComponent = (
  component,
  index,
  dispatch,
  state,
  handleComponentChange
) => {
  switch (component.type) {
    case 'checkbox':
      return (
        <div
          onMouseEnter={() =>
            dispatch({
              type: reducerCases.SET_CURRENT_TYPE,
              payload: 'checkbox',
            })
          }
        >
          <CheckBoxes
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );
    case 'longTextAnswer':
      return (
        <div
          onMouseEnter={() =>
            dispatch({ type: 'SET_CURRENT_TYPE', payload: 'longTextAnswer' })
          }
        >
          <TextAnswer
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );

    case 'email':
      return (
        <div
          onMouseEnter={() =>
            dispatch({ type: 'SET_CURRENT_TYPE', payload: 'email' })
          }
        >
          <EmailValidation
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );

    case 'cta':
      return (
        <div
          onMouseEnter={() =>
            dispatch({ type: 'SET_CURRENT_TYPE', payload: 'cta' })
          }
        >
          <Cta
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );

    case 'nps':
      return (
        <div
          onMouseEnter={() =>
            dispatch({ type: 'SET_CURRENT_TYPE', payload: 'nps' })
          }
        >
          <Nps
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );
    case 'radio':
      return (
        <div
          onMouseEnter={() =>
            dispatch({ type: reducerCases.SET_CURRENT_TYPE, payload: 'radio' })
          }
        >
          <Radio
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            initialOptions={component.options}
            components={state.components}
          />
        </div>
      );
    case 'scoreBox':
      return (
        <div
          onMouseEnter={() =>
            dispatch({
              type: reducerCases.SET_CURRENT_TYPE,
              payload: 'scoreBox',
            })
          }
        >
          <ScoreBox
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );
    case 'score':
      return (
        <div
          onMouseEnter={() =>
            dispatch({
              type: reducerCases.SET_CURRENT_TYPE,
              payload: 'scoreBox',
            })
          }
        >
          <ScoreBox
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );
    case 'designFeedback':
      return (
        <div
          onMouseEnter={() =>
            dispatch({
              type: reducerCases.SET_CURRENT_TYPE,
              payload: 'designFeedback',
            })
          }
        >
          <DesignFeedback
            onChange={(newComponent) =>
              handleComponentChange(index, newComponent)
            }
            components={state.components}
          />
        </div>
      );

    default:
      return null;
  }
};
