import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
const Signup = () => {
  // auth context
  const { signUp, createLoading, createError } =
    useAuth() as authContextInterface;

  // refs
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState({
    error: false,
    content: "",
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value;
    if (!enteredEmail || !enteredPassword || !enteredConfirmPassword) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
    }
    if (
      enteredEmail?.trim().length === 0 ||
      enteredPassword?.trim().length === 0 ||
      enteredConfirmPassword?.trim().length === 0
    ) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
    }
    if (enteredPassword !== enteredConfirmPassword) {
      setError({
        error: true,
        content: "Passwords do not match",
      });
    } else {
      if (enteredEmail !== undefined && enteredPassword !== undefined) {
        await signUp(enteredEmail, enteredPassword);
      }
    }

    // enteredEmail, enteredPassword, enteredConfirmPassword => send to API
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-start mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border
         md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          {createLoading && <LoadingSpinner />}
          {createLoading && (
            <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
          )}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 
                  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full 
                  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@example.com"
                  required={true}
                  ref={emailInputRef}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 
                  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  ref={passwordInputRef}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500"
                  required={true}
                  ref={confirmPasswordInputRef}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                    focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                    dark:ring-offset-gray-800"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {error.error && (
                <div className="flex items-center justify-center">
                  <p className="text-red-500 text-sm font-medium">
                    {error.content}
                  </p>
                </div>
              )}
              {createError && (
                <div className="flex items-center justify-center">
                  <p className="text-red-500 text-sm font-medium">
                    {createError.message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
