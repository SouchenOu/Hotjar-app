import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Details from './Details';
import Type from './Type';
import Appearance from './Appearance';
import Targeting from './Targeting';
import axios from 'axios';
import { useStateProvider } from '../../../context/StateContext';
import { toast } from 'react-toastify';
import reducer, { initialeState } from '../../../context/StateReducers';
import { reducerCases } from '../../../context/constants';
import defaultComponents from '../data/defaultComponent';
import Summary from './Summary';
import Questions from './Questions';
import Behavior from './Behavior';
import Templates from '../data/Templates';

const Page = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialeState);
  const [nextQuestion, setNextQuestion] = useState('');
  const [{ userInfo }] = useStateProvider();
  const [template, setTemplate] = useState(null);
  const { siteId, templateId } = useParams();
  const [openComponent, setOpenComponent] = useState(null);

  useEffect(() => {
    const selectedTemplate = Templates.find((t) => t._id === templateId);
    setTemplate(selectedTemplate);

    if (selectedTemplate && defaultComponents[selectedTemplate.type]) {
      dispatch({
        type: reducerCases.SET_COMPONENTS,
        payload: defaultComponents[selectedTemplate.type],
      });
      dispatch({ type: reducerCases.SET_NAME, payload: selectedTemplate.name });
      dispatch({
        type: reducerCases.SET_DESCRIPTION,
        payload: selectedTemplate.description,
      });
    }
  }, [templateId]);

  const NavigateToHome = () => {
    navigate(`/site/${siteId}/surveys`);
  };

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
      ImageFeedback: state.ImageFeedback,
      timing: state.timing.type,
      frequency: state.frequency.type,
      createdUser: userInfo._id,
      templateId: templateId,
      targetUrl: state.targetUrl,
      delayTime: state.delayTime,
    };

    try {
      const response = await axios.post(
        `https://hotjar-app.onrender.com/survey/${siteId}`,
        surveyData
      );

      if (response.status === 201) {
        toast.success('creating survey successfully');
        navigate(`/site/${siteId}/surveys`);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error('Error creating survey:', error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 px-4 lg:px-10 xl:px-20">
      <div className="fixed top-0 left-0 right-0 h-[50px] border-[2px] border-gray-300 bg-white z-10 w-full">
        <div className="flex items-center justify-start px-5 py-3 gap-3">
          <FontAwesomeIcon
            icon={faXmark}
            className="text-[16px] cursor-pointer text-red-600"
            onClick={NavigateToHome}
          />
          <h1 className="text-[15px] text-gray-800 font-medium font-roboto-slab">
            Create survey
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start mt-[60px] px-4 w-full">
        <div className="py-[50px] sm:py-[80px] text-center">
          <h1 className="text-[30px] sm:text-[36px] text-gray-800 font-bold font-montserrat">
            Create a new survey
          </h1>
        </div>
        <div className="flex flex-col w-full max-w-full  border-2 border-gray-300 rounded-xl py-4 px-2 lg:px-8">
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
          <Questions
            openComponent={openComponent}
            setOpenComponent={setOpenComponent}
            template={template}
            dispatch={dispatch}
            state={state}
            nextQuestion={nextQuestion}
          />
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
            dispatch={dispatch}
            state={state}
          />
          <Targeting
            targetUrl={state.targetUrl}
            isEditMode={false}
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
            isEditMode={false}
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
