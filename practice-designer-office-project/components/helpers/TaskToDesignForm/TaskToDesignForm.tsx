import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useNotification } from "@/context/notification-context";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";

const TaskToDesignForm: React.FC<{
  reqId: string;
}> = (props) => {
  // context
  const { acceptRequest } = useRequest() as requestContextInterface;
  const { showNotification } =
    useNotification() as notificationContextInterface;

  // refs
  const briefRef = React.useRef<HTMLTextAreaElement>(null);
  const designerRef = React.useRef<HTMLSelectElement>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const brief = briefRef.current?.value;
    const designer = designerRef.current?.value;
    const designerName = "Default Designer"; // !!! this will be dynamic
    if (!brief || !designer) {
      return showNotification({
        title: "Error",
        message: "Please add brief and select a designer.",
        status: "error",
      });
    }
    if (brief.trim().length < 0) {
      return showNotification({
        title: "Error",
        message: "Please add brief.",
        status: "error",
      });
    }
    if (designer.trim().length < 0) {
      return showNotification({
        title: "Error",
        message: "Please select a designer.",
        status: "error",
      });
    }
    await showNotification({
      title: "Loading",
      message: "Sending request to designer...",
      status: "loading",
    });
    await acceptRequest(props.reqId, brief, designer, designerName);
    await showNotification({
      title: "Success",
      message: "Request sent to designer.",
      status: "success",
    });
  };
  return (
    <form onSubmit={submitHandler}>
      <label
        htmlFor="brief"
        className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
      >
        Add Your Brief
      </label>
      <textarea
        id="brief"
        rows={4}
        className="mb-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
         border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
         dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Add your brief here..."
        ref={briefRef}
      ></textarea>

      <label
        htmlFor="designers"
        className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
      >
        Select Designer
      </label>
      <select
        id="designers"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
        dark:focus:border-primary-500"
        ref={designerRef}
      >
        <option value={""}>Select a designer</option>
        <option value={"RWy862mpirUUeI5g3HZd12QzBb32"}>Designer 1</option>
        <option value={"RWy862mpirUUeI5g3HZd12QzBb32"}>Designer 2</option>
      </select>
      <div className={"flex flex-row justify-end w-full"}>
        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
        focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
        sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-3"
        >
          Send to designer
        </button>
      </div>
    </form>
  );
};

export default TaskToDesignForm;

// todo: add logout notifications
