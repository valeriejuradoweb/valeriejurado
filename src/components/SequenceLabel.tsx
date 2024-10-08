// components/IconWithText.jsx
import React from "react";

type SequenceLabel = {
  children: React.ReactNode;
  className?: string; // Optional: to allow additional styling
};

// Define the SVG icon as a constant
const Diamond = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" fill="none">
    <path stroke="#121212" d="M.707 46L46 .707 91.293 46 46 91.293z"></path>
  </svg>
);

const SequenceLabel: React.FC<SequenceLabel> = ({ children, className }) => {
  return (
    <div className="flex items-center">
      <div>
        <Diamond /> {/* Render the SVG icon */}
      </div>
      <div className="absolute w-24 text-center tracking-[.3em]">
        <span>{children}</span> {/* Render the children */}
      </div>
    </div>
  );
};

export default SequenceLabel;
