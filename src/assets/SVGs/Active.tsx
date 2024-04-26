import React from "react";

interface IconProps {
  color?: string;
  className?: string;
}

const Active: React.FC<IconProps> = ({
  color = "none",
  className = "w-[32px] h-[32px]",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16Z"
        fill="#7F56D9"
      />
      <path
        d="M1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16Z"
        stroke="#7F56D9"
        stroke-width="2"
      />
      <circle cx="16" cy="16" r="5" fill="white" />
    </svg>
  );
};

export default Active;