import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import { useAuth } from "@/context/auth-context";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/router";
import { useNotification } from "@/context/notification-context";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";

const Login = () => {
  // auth context
  const { login, loginLoading, loginError, user, getUserRole } =
    useAuth() as authContextInterface;
  // notification context
  const { showNotification } =
    useNotification() as notificationContextInterface;

  // router
  const router = useRouter();

  // refs
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState({
    error: false,
    content: "",
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    if (!enteredEmail || !enteredPassword) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
    }
    if (
      enteredEmail?.trim().length === 0 ||
      enteredPassword?.trim().length === 0
    ) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
    }
    // enteredEmail, enteredPassword => send to API
    if (enteredEmail !== undefined && enteredPassword !== undefined) {
      await showNotification({
        message: "Logging in...",
        status: "loading",
        title: "Logging in",
      });
      await login(enteredEmail, enteredPassword);
    }
  };
  const handleUserRole = async () => {
    if (user) {
      const userRole = await getUserRole();
      await router.push(`/${userRole}`);
      await showNotification({
        message: "Logged in",
        status: "success",
        title: "Logged in",
      });
    }
  };

  handleUserRole().then();
  useEffect(() => {
    if (loginError) {
      showNotification({
        message: loginError.message,
        status: "error",
        title: "Logged in",
      });
    }
  }, [loginError]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-start mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0
         dark:bg-gray-800 dark:border-gray-700"
        >
          {loginLoading && <LoadingSpinner />}
          {loginLoading && (
            <div className="fixed inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
          )}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  ref={passwordInputRef}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href="/auth/forget-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              {error.error && (
                <div className="flex items-center justify-center">
                  <p className="text-red-500 text-sm font-medium">
                    {error.content}
                  </p>
                </div>
              )}
              {loginError && (
                <div className="flex items-center justify-center">
                  <p className="text-red-500 text-sm font-medium">
                    {loginError.message}
                  </p>
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/auth"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
