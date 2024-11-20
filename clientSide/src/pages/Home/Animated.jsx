import { React } from 'react';
const Animated = () => {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 300"
        className="w-full h-full"
      >
        <defs>
          <style>
            {`
              @keyframes draw {
                0% {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 1000;
                }
                100% {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 0;
                }
              }

              .animated-line {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 2s ease-in-out forwards infinite;
              }
            `}
          </style>
        </defs>
        <path
          className="animated-line stroke-orange-600 stroke-4"
          d="M50 150 Q 100 50, 150 150 T 250 150 T 350 150"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default Animated;
