import PropTypes from 'prop-types';
import { useState, React } from 'react';

const ToolTip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="absolute p-2 w-[130px] text-[12px] right-[20px] top-[50px] font-semibold bg-gray-500 text-white rounded-lg z-50">
          {text}
        </div>
      )}
    </div>
  );
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ToolTip;
