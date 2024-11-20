import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import React from 'react';

const EmailValidation = ({ onChange, components }) => {
  const comp = components.find((comp) => comp.type === 'email');
  const [TemplateTitle, setTemplateTitle] = useState(comp.question);
  const currentComponent = components.find((comp) => comp.type === 'email');

  useEffect(() => {
    onChange({
      _id: currentComponent._id,
      type: 'email',
      question: TemplateTitle,
      validation: '',
    });
  }, [TemplateTitle]);

  const handleTemplateTitleChange = (event) => {
    setTemplateTitle(event.target.value);
  };

  return (
    <div className="relative flex flex-col gap-6 border-2 p-6 border-gray-300 w-[550px] h-full hover:bg-gray-100 transition duration-200 ease-in-out rounded-lg shadow-md">
      <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-blue-200 rounded-lg py-3 px-4 shadow-md">
        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-white" />
        <span className="text-[14px] text-white font-bold font-montserrat">
          Email with Validation
        </span>
      </div>
      <textarea
        value={TemplateTitle}
        onChange={handleTemplateTitleChange}
        className="block font-montserrat rounded-lg px-4 py-3 text-[15px] border-2 border-gray-300 w-full shadow-sm 
                           focus:border-blue-500 focus:ring-0 focus:outline-none transition duration-200 ease-in-out 
                           hover:border-blue-400"
        style={{ minHeight: '60px' }}
        placeholder="Enter your question here..."
      />
    </div>
  );
};

EmailValidation.propTypes = {
  onChange: PropTypes.func.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EmailValidation;
