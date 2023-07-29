import React, { useEffect } from "react";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";
import { useNotification } from "@/context/notification-context";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";

const FinishTaskForm: React.FC<{
  designId: string;
}> = (props) => {
  // refs
  const designerNoteRef = React.useRef<HTMLTextAreaElement>(null);
  // const fileRef = React.useRef<HTMLInputElement>(null);
  //
  const { finishTask, creatingError, creatingLoading } =
    useRequest() as requestContextInterface;
  // notification context
  const { showNotification } =
    useNotification() as notificationContextInterface;
  // submit handler
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // fileRef will be added later
    const designerNote = designerNoteRef.current?.value;
    if (!designerNote) {
      return showNotification({
        status: "error",
        title: "Error",
        message: "Please add a note to send to Manager",
      });
    }
    await showNotification({
      status: "loading",
      title: "Sending to Account Manager",
      message: "Please wait while we are sending your design to Manager",
    });
    await finishTask(props.designId, designerNote);
    await showNotification({
      status: "success",
      title: "Sent to Account Manager",
      message:
        "Your design has been sent to Manager successfully. Waiting for Manager's approval.",
    });
  };

  useEffect(() => {
    if (creatingError) {
      showNotification({
        status: "error",
        title: "Error",
        message: creatingError.message,
      });
    }
  }, [creatingError]);

  return (
    <form onSubmit={submitHandler}>
      {creatingLoading && <LoadingSpinner />}
      {creatingLoading && (
        <div className="fixed inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      <label
        htmlFor="dropzone-file"
        className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
      >
        Add Your Work Here
      </label>
      <div className="flex items-center justify-center w-full mb-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300
           border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700
           hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>

      <label
        htmlFor="note"
        className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
      >
        Add Designer Note
      </label>
      <textarea
        id="note"
        rows={4}
        className="mb-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
         border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
         dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Add your note here..."
        ref={designerNoteRef}
      ></textarea>
      <div className={"flex flex-row justify-end w-full"}>
        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
        focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
        sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-3"
        >
          Send to Account Manager
        </button>
      </div>
    </form>
  );
};

export default FinishTaskForm;
