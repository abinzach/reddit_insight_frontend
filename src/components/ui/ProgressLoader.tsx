import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

const ProgressLoader: React.FC<ProgressProps> = ({ value, className }) => {
  const progressStyle = {
    width: `${value}%`,
  };

  return (
    <div className={`bg-gray-200 h-4 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-blue-500"
        style={progressStyle}
      ></div>
    </div>
  );
};

export default ProgressLoader;
