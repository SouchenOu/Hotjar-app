import PropTypes from 'prop-types';
import React from 'react';

const Modal = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg mx-4 sm:mx-auto">
        <div className="flex flex-col items-center gap-[5px]">
          <h3 className="text-[20px] font-semibold text-gray-800 ">
            Confirm Deletion
          </h3>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className=" flex tems-center justify-center  p-4  gap-6">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-lg text-[13px] font-semibold hover:bg-red-700 transition duration-200"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Modal;
