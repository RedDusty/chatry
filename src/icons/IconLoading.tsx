import React from "react";

const IconLoading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 100 100"
      className="w-full h-full "
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="36"
        strokeWidth="3"
        strokeDasharray="56.548667764616276 56.548667764616276"
        fill="none"
        strokeLinecap="round"
        className="stroke-sky-800 dark:stroke-indigo-400"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1.5s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="30"
        strokeWidth="3"
        strokeDasharray="50.26548245743669 50.26548245743669"
        strokeDashoffset="50.26548245743669"
        fill="none"
        strokeLinecap="round"
        className="stroke-sky-400 dark:stroke-indigo-800"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1.5s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;-360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default IconLoading;
