import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';

const ScoreBox = ({ onChange, components }) => {
  const currentComponent = components.find((comp) => comp.type === 'scoreBox');
  const [TemplateTitle, setTemplateTitle] = useState(currentComponent.question);
  const [HighScore, setHighScore] = useState(currentComponent.highScoreTitle);
  const [LowScore, setLowScore] = useState(currentComponent.lowScoreTitle);

  useEffect(() => {
    onChange({
      _id: currentComponent._id,
      type: 'scoreBox',
      question: TemplateTitle,
      lowScoreTitle: LowScore,
      highScoreTitle: HighScore,
    });
  }, [TemplateTitle, LowScore, HighScore]);
  const handleTemplateTitleChange = (event) => {
    setTemplateTitle(event.target.value);
  };
  const handleLowScore = (event) => {
    setLowScore(event.target.value);
  };
  const handleHighScore = (event) => {
    setHighScore(event.target.value);
  };

  return (
    <div className="flex flex-col gap-[30px] border-[2px] p-[30px] border-gray-300 w-[550px] h-auto hover:bg-gray-100 overflow-hidden ">
      <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-blue-200 rounded-lg py-3 px-4 shadow-md">
        <FontAwesomeIcon icon={faFaceSmile} className="w-5 h-5 text-white" />
        <span className="text-[15px] text-white font-bold font-montserrat">
          1-5 Rating Scale
        </span>
      </div>
      <textarea
        value={TemplateTitle}
        onChange={handleTemplateTitleChange}
        className="border-2 text-[15px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400  hover:border-gray-600 w-full"
        style={{ minHeight: '60px' }}
      />
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px] ">
          <h1 className="text-[16px] font-bold">Low score label</h1>
          <input
            value={LowScore}
            className="shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-600 border-[2px] border-gray-300 rounded-2xl p-3 w-[500px] text-[13px]"
            onChange={handleLowScore}
          />
        </div>
        <div className="flex flex-col gap-[10px] ">
          <h1 className="text-[16px] font-bold">High score label</h1>
          <input
            value={HighScore}
            className="shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-600 border-[2px] border-gray-300 rounded-2xl p-3 w-[500px] text-[13px]"
            onChange={handleHighScore}
          />
        </div>
      </div>
    </div>
  );
};
ScoreBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      highScoreTitle: PropTypes.string.isRequired,
      lowScoreTitle: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ScoreBox;
