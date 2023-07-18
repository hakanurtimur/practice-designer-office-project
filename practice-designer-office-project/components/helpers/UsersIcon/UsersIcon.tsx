import React from "react";

const UsersIcon: React.FC<{
  className: string;
}> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      width="24"
      height="24"
      fill="none"
      stroke="#000"
      strokeWidth="0"
      viewBox="0 0 24 24"
    >
      <g fill="#f43f5e">
        <path d="M15.5 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"></path>
        <path
          d="M19.5 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM4.5 7.5a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
          opacity="0.4"
        ></path>
        <path d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5z"></path>
        <path
          d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5 1.79-2.5 4-2.5 4 1.12 4 2.5zM2 16.5C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5z"
          opacity="0.4"
        ></path>
      </g>
    </svg>
  );
};

export default UsersIcon;
