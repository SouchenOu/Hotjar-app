import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

export const ButtonCheckBox = ({
  language,
  nextComponent,
  buttonColor,
  checkboxStates,
}) => {
  return (
    <div className="flex gap-[40px] p-[10px] items-center justify-center">
      {language === 'en' && (
        <button
          className="underline font-medium text-[15px] text-gray-700 hover:text-gray-900"
          onClick={nextComponent}
        >
          Skip
        </button>
      )}
      {language === 'ar' && (
        <button
          className="underline font-medium text-[15px] text-gray-700 hover:text-gray-900"
          onClick={nextComponent}
        >
          تجاوز
        </button>
      )}
      {language === 'fr' && (
        <button
          className="underline font-medium text-[15px] text-gray-700 hover:text-gray-900"
          onClick={nextComponent}
        >
          Passer
        </button>
      )}
      {language === 'en' && (
        <button
          className={`border-2 border-transparent rounded-xl text-[15px] py-1 px-4 w-30 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
          onClick={nextComponent}
          style={{
            background: checkboxStates.some((state) => state)
              ? buttonColor
              : 'gray',
          }}
          disabled={!checkboxStates.some((state) => state)}
        >
          Next{' '}
          {!checkboxStates.some((state) => state) && (
            <FontAwesomeIcon icon={faBan} className="ml-2 text-red-700" />
          )}
        </button>
      )}
      {language === 'ar' && (
        <button
          className={`border-2 border-transparent rounded-xl text-[15px] py-1 px-4 w-30 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
          onClick={nextComponent}
          style={{
            background: checkboxStates.some((state) => state)
              ? buttonColor
              : 'gray',
          }}
          disabled={!checkboxStates.some((state) => state)}
        >
          التالي{' '}
          {!checkboxStates.some((state) => state) && (
            <FontAwesomeIcon icon={faBan} className="ml-2 text-red-700" />
          )}
        </button>
      )}
      {language === 'fr' && (
        <button
          className={`border-2 border-transparent rounded-xl text-[15px] py-1 px-4 w-30 font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
          onClick={nextComponent}
          style={{
            background: checkboxStates.some((state) => state)
              ? buttonColor
              : 'gray',
          }}
          disabled={!checkboxStates.some((state) => state)}
        >
          Suivant{' '}
          {!checkboxStates.some((state) => state) && (
            <FontAwesomeIcon icon={faBan} className="ml-2 text-red-700" />
          )}
        </button>
      )}
    </div>
  );
};

ButtonCheckBox.propTypes = {
  language: PropTypes.oneOf(['en', 'ar', 'fr']).isRequired,
  nextComponent: PropTypes.func.isRequired,
  buttonColor: PropTypes.string.isRequired,
  checkboxStates: PropTypes.arrayOf(PropTypes.bool).isRequired,
};
