import {
  faExclamationCircle,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';

const Radio = ({ onChange, components }) => {
  const currentComponent = components.find((comp) => comp.type === 'radio');
  const [options, setOptions] = useState(currentComponent.options);
  const [TemplateTitle, setTemplateTitle] = useState(currentComponent.question);

  useEffect(() => {
    onChange({
      _id: currentComponent._id,
      type: 'radio',
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
    <div className="flex flex-col gap-[30px] border-[2px] p-[30px] border-gray-300 sm:w-full md:w-[300px] xl:w-[400px] 2xl:w-[600px] h-auto hover:bg-gray-100 overflow-auto ">
      <textarea
        value={TemplateTitle}
        onChange={handleTemplateTitleChange}
        className="border-2 text-[16px] font-montserrat border-gray-300 shadow-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400  hover:border-gray-600 w-full"
        style={{ minHeight: '60px' }}
      />

      <div className="flex flex-col gap-[20px]">
        {options.map((option, index) => (
          <div className="flex gap-[10px] items-center" key={index}>
            <h1 className="flex  items-center gap-[2px] text-[10px] text-gray-600 font-bold">
              ANSWER{' '}
              <a
                href="#test"
                className="rounded-[50%]  px-[4px] text-white border-[2px] bg-gray-400"
              >
                {index}
              </a>
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
                className="w-[13px] text-red-600 h-[13px] cursor-pointer"
                onClick={handleDeleteLastOption}
              />
            </div>
          </div>
        ))}
        <button
          className="border-[2px] border-[#0D19A3] bg-gradient-to-r text-white from-blue-900 to-blue-800 hover:bg-blue-200 w-[120px] text-[14px] py-[8px]  font-medium rounded-xl"
          onClick={handleAddOption}
        >
          Add Answer
        </button>
      </div>
    </div>
  );
};

Radio.propTypes = {
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

export default Radio;
