import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);
  return (
    <div
      className={`fixed right-5 p-2 rounded-lg shadow-2xl transition-transform transform ${
        show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${
        type === 'success'
          ? 'bg-green-700 text-white border border-green-700'
          : 'bg-red-500 text-white border border-red-600'
      } flex items-center space-x-4`}
    >
      <span className="flex-shrink-0">
        {type === 'success' ? (
          <FontAwesomeIcon
            icon={faCheck}
            className="text-[12px] text-green-950"
          />
        ) : (
          <FontAwesomeIcon
            icon={faClose}
            className="text-[12px] text-red-950"
          />
        )}
      </span>
      <p className="text-[12px] font-semibold">{message}</p>
    </div>
  );
};
Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Toast;
