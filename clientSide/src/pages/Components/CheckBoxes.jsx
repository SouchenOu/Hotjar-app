import {
  faExclamationCircle,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';

const CheckBoxes = ({ onChange, components }) => {
  const currentComponent = components.find((comp) => comp.type === 'checkbox');
  const [TemplateTitle, setTemplateTitle] = useState(currentComponent.question);
  const [options, setOptions] = useState(currentComponent.options);

  useEffect(() => {
    onChange({
      _id: currentComponent._id,
      type: 'checkbox',
      question: TemplateTitle,
      options: options,
    });
  }, [TemplateTitle, options]);

  const handleOptionChange = (index, newValue) => {
    const newOptions = [...options];
    newOptions[index] = newValue;
    setOptions(newOptions);
  };

  const handleTemplateTitleChange = (event) => {
    setTemplateTitle(event.target.value);
  };

  const handleDeleteLastOption = () => {
    if (options.length > 0) {
      setOptions(options.slice(0, -1));
    }
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  return (
    <div className="flex flex-col gap-[30px] border-[2px] p-[30px] border-gray-300 md:w-[300px] xl:w-[400px] 2xl:w-[600px] h-auto hover:bg-gray-100 overflow-auto ">
      <textarea
        value={TemplateTitle}
        onChange={handleTemplateTitleChange}
        className="border-2 text-[15px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400  w-full hover:border-gray-600 "
        style={{ minHeight: '60px' }}
      />
      <div className="flex flex-col gap-[20px]">
        {options.map((option, index) => (
          <div className="flex gap-[20px] items-center" key={index}>
            <h1 className="flex items-center justify-center text-[10px] text-blue-900 font-bold font-ubuntu">
              ANSWER
              <span className="ml-1 w-3 rounded-full  px-[3px] text-white bg-gray-400 shadow-md">
                {index + 1}
              </span>
            </h1>
            <div className="relative">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder="Enter the label for this answer"
                className="relative shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 hover:border-blue-600 border-[2px] border-gray-300 rounded-2xl p-2 w-full text-[15px] 2xl:w-[300px]"
              />
              {!option && (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="absolute right-3 top-[13px] w-[15px] h-[15px] text-red-500"
                />
              )}
            </div>

            <div className="flex gap-[10px]">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-red-900 w-[14px] h-[14px] cursor-pointer"
                onClick={handleDeleteLastOption}
              />
            </div>
          </div>
        ))}
        <button
          className="border-[2px] border-[#0D19A3] bg-gradient-to-r text-white from-blue-900 to-blue-800 hover:bg-blue-200 w-[100px] text-[12px] py-[4px]  font-medium rounded-xl"
          onClick={handleAddOption}
        >
          Add Answer
        </button>
      </div>
    </div>
  );
};

CheckBoxes.propTypes = {
  onChange: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default CheckBoxes;
