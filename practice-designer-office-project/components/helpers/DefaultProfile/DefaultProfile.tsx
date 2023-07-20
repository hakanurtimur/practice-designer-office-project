import React from "react";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import Link from "next/link";

const DefaultProfile: React.FC<{
  userRole: string;
}> = (props) => {
  const { user } = useAuth() as authContextInterface;
  return (
    <div className="mx-auto w-full mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center mt-10 pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={user?.photoURL || "/user-pen.png"}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.displayName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <Link
            href={`/${props.userRole}/profile/update`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update Profile
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </Link>
          <Link
            href={`/${props.userRole}`}
            className="inline-flex items-center px-4 py-2
            text-sm font-medium text-center text-gray-900
            rounded-lg hover:text-primary-600
            dark:text-white 
            dark:hover:text-primary-700"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DefaultProfile;
