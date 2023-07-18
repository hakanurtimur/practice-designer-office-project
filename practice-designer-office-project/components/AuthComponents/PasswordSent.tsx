import React from "react";
import Link from "next/link";
import SuccessSvg from "@/components/helpers/SuccesSvg/SuccessSvg";

const PasswordSent = () => {
  return (
    <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
      <div className="space-y-4 md:space-y-6">
        <div>
          <SuccessSvg
            className={
              "w-12 h-12 mx-auto my-1 text-green-500 dark:text-green-400 flex-shrink-0  animate-bounce"
            }
          />
          <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Your reset password link has been sent to your email.
          </div>
          <br />
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Please check your email and click on the link to reset your
            password.
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={"/auth/login"}
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Back to login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordSent;
