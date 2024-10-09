// components/IconWithText.jsx
import React from "react";

type SequenceLabel = {
  children: React.ReactNode;
  className?: string; // Optional: to allow additional styling
};

// Define the SVG icon as a constant
const Diamond = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" fill="none">
    <path stroke="#ffffff" d="M.707 46L46 .707 91.293 46 46 91.293z"></path>
  </svg>
);

const MobileDiamond = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" fill="none">
    <path
      stroke="#ffffff"
      strokeWidth="0.5"
      d="M.354 26.749L26.164.939l25.809 25.81-25.81 25.81z"
    ></path>
  </svg>
);

const SequenceLabel: React.FC<SequenceLabel> = ({ children, className }) => {
  return (
    <div className="flex items-center">
      <div className="hidden md:block">
        <Diamond /> {/* Render the SVG icon */}
      </div>
      <div className="block md:hidden">
        <MobileDiamond /> {/* Render Mobile the SVG icon */}
      </div>
      <div className="absolute w-14 text-center tracking-widest md:tracking-[.3em] md:w-24">
        <span>{children}</span> {/* Render the children */}
      </div>
    </div>
  );
};

export default SequenceLabel;
