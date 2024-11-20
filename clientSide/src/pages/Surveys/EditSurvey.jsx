import { useEffect, useReducer, useState, React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Details from './CreateSurvey/Details';
import Type from './CreateSurvey/Type';
import Appearance from './CreateSurvey/Appearance';
import Targeting from './CreateSurvey/Targeting';
import reducer, { initialeState } from '../../context/StateReducers';
import { reducerCases } from '../../context/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronDown,
  faChevronLeft,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Summary from './CreateSurvey/Summary';
import Component from '../Components/Component';
import Behavior from './CreateSurvey/Behavior';
import { renderComponent } from './data/renderComponent';

const EditSurvey = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialeState);
  const [nextQuestion, setNextQuestion] = useState('');
  const [targetUrlVal, setTargetUrlVal] = useState('');
  const [openComponent, setOpenComponent] = useState(null);
  const { id, surveyId } = useParams();

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/survey/getSurvey/${surveyId}`
        );
        if (response.status === 200) {
          const surveyData = response.data;
          dispatch({ type: reducerCases.SET_NAME, payload: surveyData.name });
          dispatch({
            type: reducerCases.SET_DESCRIPTION,
            payload: surveyData.description,
          });
          dispatch({
            type: reducerCases.SET_COMPONENTS,
            payload: surveyData.components,
          });
          dispatch({
            type: reducerCases.SET_TARGET,
            payload: surveyData.target,
          });
          dispatch({
            type: reducerCases.SET_STATUS,
            payload: surveyData.status,
          });
          dispatch({
            type: reducerCases.SET_BG_COLOR,
            payload: surveyData.backgroundColor,
          });
          dispatch({
            type: reducerCases.SET_BUTTON_COLOR,
            payload: surveyData.buttonColor,
          });
          dispatch({
            type: reducerCases.SET_LANGUAGE,
            payload: surveyData.language,
          });
          dispatch({ type: reducerCases.SET_LOGO, payload: surveyData.logo });
          dispatch({
            type: reducerCases.SET_CURRENT_TYPE,
            payload: surveyData.components[0].type,
          });
          dispatch({
            type: reducerCases.SET_TIMING,
            payload: surveyData.timing,
          });
          dispatch({
            type: reducerCases.SET_FREQUENCY,
            payload: surveyData.frequency,
          });
          dispatch({
            type: reducerCases.SET_DELAY_TIME,
            payload: surveyData.delayTime,
          });
        }
      } catch (error) {
        toast.error('Failed to fetch survey data.');
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  const handleSubmit = async () => {
    const surveyData = {
      name: state.name,
      description: state.description,
      components: state.components,
      target: state.target,
      status: state.status,
      backgroundColor: state.bgColor,
      buttonColor: state.buttonColor,
      textColor: state.textColor,
      language: state.language,
      logo: state.logo,
      targetUrl: state.targetUrl,
      timing: state.timing.type,
      frequency: state.frequency.type,
      delayTime: state.delayTime,
    };
    try {
      const response = await axios.put(
        `http://localhost:8000/survey/update/${surveyId}`,
        surveyData
      );
      if (response.status === 200) {
        toast.success('Survey updated successfully');
        navigate(`/site/${id}/surveys`);
      }
    } catch (error) {
      toast.error('Failed to update survey.');
      console.error('Error updating survey:', error);
    }
  };
  const handleComponentChange = (index, newComponent) => {
    const newComponents = [...state.components];

    newComponents[index] = newComponent;
    dispatch({ type: reducerCases.SET_COMPONENTS, payload: newComponents });
  };

  const NavigateToSurvey = () => {
    navigate(`/site/${id}/surveys`);
  };
  const handleQuestion = () => {
    if (openComponent !== 'Qsm') {
      setOpenComponent('Qsm');
    } else {
      setOpenComponent(null);
    }
  };

  useEffect(() => {
    const getSurveyId = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8000/survey/getSurvey/${surveyId}`
        );
        setTargetUrlVal(result.data.targetUrl);
        dispatch({
          type: reducerCases.SET_TARGET_URL,
          payload: {
            url: result.data.targetUrl.url,
            matchType: result.data.targetUrl.matchType,
          },
        });
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    getSurveyId();
  }, [surveyId, dispatch]);

  return (
    <div className="flex flex-col items-start gap-6 px-4 lg:px-10 xl:px-20">
      <div className="fixed top-0 left-0 right-0 h-[50px] border-[2px] border-gray-300 bg-white z-10 w-full">
        <div className="flex items-center justify-start px-5 py-3 gap-3">
          <FontAwesomeIcon
            icon={faXmark}
            className="text-[16px] cursor-pointer text-red-600"
            onClick={NavigateToSurvey}
          />
          <h1 className="text-[15px] text-gray-800 font-medium font-roboto-slab">
            Edit survey
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start mt-[60px] px-4 w-full">
        <div className="py-[50px] sm:py-[80px] text-center">
          <h1 className="text-[30px] sm:text-[36px] text-gray-800 font-bold font-montserrat">
            Edit survey
          </h1>
        </div>
        <div className="flex flex-col w-full border-2 border-gray-300 rounded-xl py-4 px-2 lg:px-8">
          <Details
            state={state}
            dispatch={dispatch}
            openComponent={openComponent}
            setOpenComponent={setOpenComponent}
          />
          <Type
            openComponent={openComponent}
            setOpenComponent={setOpenComponent}
            state={state}
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
          />
          <div className="flex flex-col gap-[20px] border-b-[2px]">
            <div
              className="flex items-center w-full justify-between bg-white rounded-lg  hover:shadow-lg transition duration-200 ease-in-out  shadow-md hover:bg-gray-100 cursor-pointer"
              onClick={handleQuestion}
            >
              <div className="flex items-center gap-3 p-2 w-full">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="w-3 h-3 p-2 rounded-full text-white"
                  style={{ background: 'green' }}
                />
                <div className="flex flex-col">
                  <h1 className="text-[14px] font-ubuntu font-medium text-gray-800">
                    Questions:
                  </h1>
                  <p className="text-[13px] font-medium font-montserrat text-gray-600 ">
                    3 questions
                  </p>
                </div>
              </div>
              {openComponent !== 'Qsm' && (
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="w-[17px] h-[17px] cursor-pointer p-2"
                  onClick={handleQuestion}
                />
              )}
              {openComponent === 'Qsm' && (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-[17px] h-[17px] cursor-pointer p-2"
                  onClick={handleQuestion}
                />
              )}
            </div>
            {openComponent === 'Qsm' && (
              <div className="flex items-center overflow-hidden gap-[150px] ">
                <div className="flex flex-col gap-5 overflow-y-auto p-[20px]  ">
                  {state.components.map((component, index) =>
                    renderComponent(
                      component,
                      index,
                      dispatch,
                      state,
                      handleComponentChange
                    )
                  )}
                  <button
                    className="border-2 border-transparent rounded-xl text-[16px] py-2 px-4 w-24 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => setOpenComponent('appearance')}
                  >
                    Next
                  </button>
                </div>
                <div className="sticky top-0 self-start  p-[20px]">
                  <Component
                    state={state}
                    nextQuestion={nextQuestion}
                    setNextQuestion={setNextQuestion}
                  />
                </div>
              </div>
            )}
          </div>
          <Appearance
            openComponent={openComponent}
            setOpenComponent={setOpenComponent}
            state={state}
            dispatch={dispatch}
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
          />
          <Behavior
            openComponent={openComponent}
            setOpenComponent={setOpenComponent}
            state={state}
            dispatch={dispatch}
          />
          <Targeting
            targetUrlVal={targetUrlVal}
            isEditMode={true}
            openComponent={openComponent}
            setOpenComponent={setOpenComponent}
            state={state}
            dispatch={dispatch}
          />
          <Summary
            openComponent={openComponent}
            setOpenComponent={setOpenComponent}
            state={state}
            dispatch={dispatch}
            handleSubmit={handleSubmit}
            isEditMode={true}
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSurvey;
