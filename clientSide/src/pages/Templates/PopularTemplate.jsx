import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { React } from 'react';

const PopularTemplate = ({ templates, handleClick, NavigateToTemplate }) => {
  return (
    <div className="flex flex-col items-start gap-[30px] px-4 lg:px-10">
      <div>
        <h1 className="text-xl lg:text-2xl font-rubik text-gray-800">
          Explore popular templates
        </h1>
        <p className="text-sm lg:text-base text-gray-500">
          Set up surveys in minutes and ask all the right questions
        </p>
      </div>

      <div className="flex flex-wrap gap-[20px] justify-start lg:flex-row flex-col">
        {templates.map((template) => (
          <div
            className="flex flex-col gap-[20px] border-2 rounded-lg p-5 border-gray-300 items-start lg:w-[23%] w-full transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            key={template._id}
            onClick={() => handleClick(template._id)}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-56 object-cover rounded-md transition-transform duration-300 ease-in-out"
            />
            <div className="flex flex-col gap-[10px]">
              <h1 className="text-lg text-gray-800 font-bold font-rubik">
                {template.name}
              </h1>
              <p className="text-sm text-gray-600 font-rubik">
                {template.description}
              </p>
            </div>
          </div>
        ))}
        <div
          className="flex flex-col items-center justify-center gap-[30px] border-2 rounded-lg p-5 border-gray-300 lg:w-[23%] w-full transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          onClick={NavigateToTemplate}
        >
          <img
            src="/template.svg"
            alt="Browse templates"
            className="w-full h-56 object-cover rounded-md transition-transform duration-300 ease-in-out"
          />
          <div className="border-[1px] flex items-center gap-2 justify-center border-blue-900 px-6 py-2 rounded-full">
            <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-blue-900" />
            <h1 className="text-md text-blue-900 cursor-pointer font-medium font-rubik">
              Browse Templates
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

PopularTemplate.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  NavigateToTemplate: PropTypes.func.isRequired,
};

export default PopularTemplate;
