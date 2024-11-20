import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

export const ButtonScore = ({
  displayMode,
  language,
  nextComponent,
  selectedNumber,
  buttonColor,
}) => {
  return (
    <div className="flex items-center gap-[20px] justify-center   mt-6">
      {language === 'en' && (
        <button
          className="underline font-medium text-[14px] text-gray-700 hover:text-gray-900"
          onClick={nextComponent}
        >
          Skip
        </button>
      )}
      {language === 'ar' && (
        <button
          className="underline font-medium text-[14px] text-gray-700 hover:text-gray-900"
          onClick={nextComponent}
        >
          تجاوز
        </button>
      )}
      {language === 'fr' && (
        <button
          className="underline font-medium text-[14px] text-gray-700 hover:text-gray-900"
          onClick={nextComponent}
        >
          Passer
        </button>
      )}
      {language === 'en' && (
        <button
          className={`border-2 border-transparent rounded-xl text-[13px] py-2 px-4 w-[100px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
          onClick={nextComponent}
          style={{ background: selectedNumber > 0 ? buttonColor : 'gray' }}
          disabled={selectedNumber <= 0}
        >
          Next{' '}
          {selectedNumber <= 0 && (
            <FontAwesomeIcon icon={faBan} className="ml-[10px] text-red-700" />
          )}
        </button>
      )}
      {language === 'fr' && (
        <button
          className={`border-2 border-transparent rounded-xl text-[14px] py-2 px-4 w-[100px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
          onClick={nextComponent}
          style={{ background: selectedNumber > 0 ? buttonColor : 'gray' }}
          disabled={selectedNumber <= 0}
        >
          Suivant{' '}
          {selectedNumber <= 0 && (
            <FontAwesomeIcon icon={faBan} className="ml-[10px] text-red-700" />
          )}
        </button>
      )}
      {language === 'ar' && (
        <button
          className={`border-2 border-transparent rounded-xl text-[14px] py-2 px-4 w-[100px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 }`}
          onClick={nextComponent}
          style={{ background: selectedNumber > 0 ? buttonColor : 'gray' }}
          disabled={selectedNumber <= 0}
        >
          التالي{' '}
          {selectedNumber <= 0 && (
            <FontAwesomeIcon icon={faBan} className="ml-[10px] text-red-700" />
          )}
        </button>
      )}
    </div>
  );
};

ButtonScore.propTypes = {
  displayMode: PropTypes.oneOf(['desktop', 'mobile']).isRequired,
  language: PropTypes.oneOf(['en', 'ar', 'fr']).isRequired,
  nextComponent: PropTypes.func.isRequired,
  selectedNumber: PropTypes.number.isRequired,
  buttonColor: PropTypes.string.isRequired,
};
