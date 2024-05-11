"use client"
import React, { useState } from "react";

interface TruncateTextProps {
  text: string;
  maxLength: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLength }) => {
  const [truncate, setTruncate] = useState(true);

  const truncatedText = truncate ? text.slice(0, maxLength) : text;
  const showButton = text.length > maxLength;

  const toggleTruncate = () => {
    setTruncate(!truncate);
  };

  return (
    <div>
      <p className="text-sm">{truncatedText}</p>
      {showButton && (
        <button className="text-xs text-blue-600" onClick={toggleTruncate}>
          {truncate ? "... Read More" : "Read Less"}
        </button>
      )}
    </div>
  );
};

export default TruncateText;
