import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';

const Nps = ({ onChange, components }) => {
  const currentComponent = components.find((comp) => comp.type === 'nps');

  const [TemplateTitle, setTemplateTitle] = useState(currentComponent.question);
  const [HighScore, setHighScore] = useState(currentComponent.highScoreTitle);
  const [LowScore, setLowScore] = useState(currentComponent.lowScoreTitle);

  useEffect(() => {
    onChange({
      _id: currentComponent._id,
      type: 'nps',
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
    <div className="relative flex flex-col gap-6 border-2 p-6 border-gray-300 w-full  h-auto bg-white shadow-lg rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
      <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-blue-200 rounded-lg py-3 px-4 shadow-md">
        <FontAwesomeIcon icon={faFaceSmile} className="w-5 h-5 text-white" />
        <span className="text-[15px] text-white font-bold font-montserrat">
          Net Promoter Score
        </span>
      </div>
      <textarea
        value={TemplateTitle}
        onChange={handleTemplateTitleChange}
        className="block font-montserrat rounded-lg px-4 py-3 text-[16px] border-2 border-gray-300 w-full shadow-sm 
                        focus:border-blue-500 focus:ring-0 focus:outline-none transition duration-200 ease-in-out 
                        hover:border-blue-400"
        style={{ minHeight: '60px' }}
        placeholder="Enter your question here..."
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-[14px] font-bold text-gray-700 font-montserrat">
            Low score label
          </h1>
          <input
            value={LowScore}
            className="border-2 text-[14px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-600"
            onChange={handleLowScore}
            placeholder="Enter low score label..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[14px] font-bold text-gray-700 font-montserrat">
            High score label
          </h1>
          <input
            value={HighScore}
            className="border-2 text-[14px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-600"
            onChange={handleHighScore}
            placeholder="Enter high score label..."
          />
        </div>
      </div>
    </div>
  );
};

Nps.propTypes = {
  onChange: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      lowScoreTitle: PropTypes.string,
      highScoreTitle: PropTypes.string,
    })
  ).isRequired,
};

export default Nps;
