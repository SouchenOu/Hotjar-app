import PropTypes from 'prop-types';
import React from 'react';

const ToolTip = ({ text, style }) => {
  return (
    <div
      className="absolute p-2 bg-black text-white rounded-lg z-50"
      style={style}
    >
      {text}
    </div>
  );
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};
export default ToolTip;
