import {
  faFaceSmile,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';

const DesignFeedback = ({ onChange, components }) => {
  const currentComponent = components.find(
    (comp) => comp.type === 'designFeedback'
  );
  const [TemplateTitle, setTemplateTitle] = useState(currentComponent.question);
  const [HighScore, setHighScore] = useState(currentComponent.highScoreTitle);
  const [image, setImage] = useState(currentComponent.image);
  const [removeImage, setRemoveImage] = useState(false);
  const [LowScore, setLowScore] = useState(currentComponent.lowScoreTitle);

  useEffect(() => {
    onChange({
      _id: currentComponent._id,
      type: 'designFeedback',
      question: TemplateTitle,
      lowScoreTitle: LowScore,
      highScoreTitle: HighScore,
      image: removeImage ? '' : image,
    });
  }, [TemplateTitle, LowScore, HighScore, image]);
  const handleTemplateTitleChange = (event) => {
    setTemplateTitle(event.target.value);
  };
  const handleLowScore = (event) => {
    setLowScore(event.target.value);
  };
  const handleHighScore = (event) => {
    setHighScore(event.target.value);
  };

  const handleremoveImage = () => {
    setRemoveImage(true);
    setImage('');
  };
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:8000/survey/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setImage(data.filePath);
        setRemoveImage(false);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-[30px] border-[2px] p-[30px] border-gray-300 sm:w-full md:w-[300px] xl:w-[400px] 2xl:w-[600px] h-auto hover:bg-gray-100 overflow-auto ">
      <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-blue-200 rounded-lg py-3 px-4 shadow-md">
        <FontAwesomeIcon icon={faFaceSmile} className="w-5 h-5 text-white" />
        <span className="text-[14px] text-white font-bold font-montserrat">
          1-5 Rating Scale
        </span>
      </div>

      <textarea
        value={TemplateTitle}
        onChange={handleTemplateTitleChange}
        className="border-2 text-[15px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 w-[500px] hover:border-gray-600 "
        style={{ minHeight: '60px' }}
      />
      {!removeImage && (
        <div className="flex items-center relative" onClick={handleremoveImage}>
          <FontAwesomeIcon
            icon={faTrash}
            className="w-[15px] h-[15px] absolute text-blue-700 px-[10px]"
          />
          <button className="border-[2px] border-blue-700 rounded-lg hover:border-[3px] px-[19px] py-[9px] w-[200px]  text-[13px] font-bold text-blue-700 ">
            Remove Image
          </button>
        </div>
      )}
      {removeImage && (
        <div className="flex items-center gap-[10px]">
          <input
            type="file"
            accept="image/*"
            onChange={handleAddImage}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className=" flex items-center  gap-[20px] cursor-pointer relative"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="w-[20px] h-[20px] absolute text-blue-700 px-[10px]"
            />
            <button className="border-[2px] border-blue-700 rounded-lg hover:border-[3px] px-[19px] py-[9px] w-[200px]  text-[13px] font-bold text-blue-700">
              Add Image
            </button>
          </label>
        </div>
      )}
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px] ">
          <h1 className="text-[15px] font-bold">Low score label</h1>
          <input
            value={LowScore}
            className="shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-600 border-[2px] border-gray-300 rounded-2xl p-3 w-[500px] text-[14px]"
            onChange={handleLowScore}
          />
        </div>
        <div className="flex flex-col gap-[10px] ">
          <h1 className="text-[15px] font-bold">High score label</h1>
          <input
            value={HighScore}
            className="shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-600 border-[2px] border-gray-300 rounded-2xl p-3 w-[500px] text-[14px]"
            onChange={handleHighScore}
          />
        </div>
      </div>
    </div>
  );
};

DesignFeedback.propTypes = {
  onChange: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      highScoreTitle: PropTypes.string.isRequired,
      lowScoreTitle: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default DesignFeedback;
