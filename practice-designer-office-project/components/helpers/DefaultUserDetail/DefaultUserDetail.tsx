import React from "react";
import { fetchedUser } from "@/interfaces/auth-context-interface";
import Link from "next/link";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { formatDateString } from "@/components/helpers/helper-functions/format-date";

const DefaultUserDetail: React.FC<{
  selectedUser: fetchedUser | undefined;
  role: string;
}> = (props) => {
  if (!props.selectedUser) {
    return <LoadingSpinner />;
  }
  console.log(props.selectedUser.createdAt);
  return (
    <div
      className="mx-auto w-full mt-10 max-w-sm bg-white border 
    border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex flex-col items-center mt-10 pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={props.selectedUser.photoURL || "/user-pen.png"}
          alt="User avatar"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {props.selectedUser.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {props.selectedUser.email}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDateString(props.selectedUser.createdAt)}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <Link
            href={`/${props.role}/${
              props.role === "am" ? "assigned-users" : "user-management"
            }`}
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

export default DefaultUserDetail;
