import React from "react";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/router";

const NewRequest = () => {
  const { createRequest, creatingLoading, creatingError } =
    useRequest() as requestContextInterface;

  // redirect
  const router = useRouter();
  // error states
  const [error, setError] = React.useState<string | null>(null);

  // refs
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const descriptionInputRef = React.useRef<HTMLTextAreaElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleInputRef.current || !descriptionInputRef.current) return;
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0
    ) {
      setError("Please enter a valid title and description");
      // error
    }
    await createRequest(enteredTitle, enteredDescription);
    await router.push("/client/request-list");
  };
  return (
    <div className={"mt-10"}>
      {creatingLoading && <LoadingSpinner />}
      {creatingLoading && (
        <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      <form onSubmit={submitHandler}>
        <h1
          className={`font-bold text-center mb-10 text-primary-600  text-2xl`}
        >
          New{" "}
          <span className={`font-bold text-primary-300 text-2x1`}>Request</span>
        </h1>
        <div className="w-8/12 mx-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-gray-900 dark:text-white"
              >
                Request title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
                focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Title"
                required
                ref={titleInputRef}
              />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2"></div>
            <label
              className="block mb-2 text-gray-900 dark:text-white"
              htmlFor="request-description"
            >
              Your Description
            </label>
            <textarea
              id="request-description"
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
                focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Write a comment..."
              required
              ref={descriptionInputRef}
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            {error && (
              <div className="flex items-center justify-center">
                <p className="text-red-500 text-sm font-medium">{error}</p>
              </div>
            )}
            {creatingError && (
              <div className="flex items-center justify-center">
                <p className="text-red-500 text-sm font-medium">
                  {creatingError.message}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Create Request
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 
                text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 
                dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="sr-only">Upload image</span>
                {
                  //TODO add image upload functionality
                }
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRequest;
