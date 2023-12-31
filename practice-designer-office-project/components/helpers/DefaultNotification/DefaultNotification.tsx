import React, { useEffect } from "react";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";
import { useNotification } from "@/context/notification-context";
import SuccessIcon from "@/components/ui/NotificationIcons/SuccessIcon";
import OnFireIcon from "@/components/ui/NotificationIcons/OnFireIcon";
import ErrorIcon from "@/components/ui/NotificationIcons/ErrorIcon";
import InfoIcon from "@/components/ui/NotificationIcons/InfoIcon";

const DefaultNotification: React.FC<{
  message: string;
  status: string;
}> = (props) => {
  const { hideNotification, activeNotification } =
    useNotification() as notificationContextInterface;
  const success = "text-green-500 bg-green-100 animate-fade-down";
  const error = "text-red-500 bg-red-100";
  const loading = "text-blue-500 bg-blue-100";
  const info = "text-orange-500 bg-orange-100";

  const notificationClass =
    props.status === "success"
      ? success
      : props.status === "error"
      ? error
      : props.status === "loading"
      ? loading
      : props.status === "info"
      ? info
      : "";

  useEffect(() => {
    if (activeNotification && activeNotification.status === "success") {
      const timer = setTimeout(() => {
        hideNotification();
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  return (
    <div
      id="toast-default"
      className={`${notificationClass} fixed flex bottom-0 items-center w-full justify-between p-4 rounded-lg
      shadow z-50`}
      role="alert"
    >
      <div
        className={`text-inherit inline-flex items-center justify-center flex-shrink-0 w-8 h-8 
       rounded-lg dark:bg-blue-800 dark:text-blue-200`}
      >
        {props.status === "success" ? (
          <SuccessIcon />
        ) : props.status === "loading" ? (
          <OnFireIcon />
        ) : props.status === "error" ? (
          <ErrorIcon />
        ) : props.status === "info" ? (
          <InfoIcon />
        ) : null}
      </div>
      <div className="ml-3 text-sm font-normal">{props.message}</div>
      <button
        type="button"
        className="ml-auto  -mx-1.5 -my-1.5 bg-white text-inherit hover:text-gray-900 rounded-lg focus:ring-2
        focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8
         dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => hideNotification()}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default DefaultNotification;
