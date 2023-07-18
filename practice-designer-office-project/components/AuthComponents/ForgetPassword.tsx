import React, { useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import PasswordSent from "@/components/AuthComponents/PasswordSent";

const ForgetPassword = () => {
  // state
  const [passwordSent, setPasswordSent] = useState(false);
  //refs
  const emailInputRef = useRef<HTMLInputElement>(null);

  //auth context
  const { sendPasswordReset, sendingPassword, sendPasswordError } =
    useAuth() as authContextInterface;
  const [error, setError] = useState({
    error: false,
    content: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    if (!enteredEmail) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
    }
    if (enteredEmail?.trim().length === 0) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
    }
    console.log(enteredEmail);

    if (enteredEmail !== undefined) {
      await sendPasswordReset(enteredEmail);
      if (!sendPasswordError) {
        await setPasswordSent(true);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-start px-6  mt-20 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 
        dark:bg-gray-800 dark:border-gray-700"
        >
          {sendingPassword && <LoadingSpinner />}
          {sendingPassword && (
            <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
          )}
          {!passwordSent ? (
            <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Do you forget your password?
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                    ref={emailInputRef}
                  />
                </div>
                {error.error && (
                  <div className="flex items-center justify-center">
                    <p className="text-red-500 text-sm font-medium">
                      {error.content}
                    </p>
                  </div>
                )}
                {sendPasswordError && (
                  <div className="flex items-center justify-center">
                    <p className="text-red-500 text-sm font-medium">
                      {sendPasswordError.message}
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset password
                </button>
                <div className="flex items-center justify-between">
                  <Link
                    href={"/auth/login"}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Back to login{" "}
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <PasswordSent />
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
