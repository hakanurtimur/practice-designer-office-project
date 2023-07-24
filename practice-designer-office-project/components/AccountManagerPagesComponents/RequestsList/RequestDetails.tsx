import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { formatDate } from "@/components/helpers/helper-functions/format-date";
import TaskToDesignForm from "@/components/helpers/TaskToDesignForm/TaskToDesignForm";

const RequestDetails: React.FC<{
  requestId: string | string[] | undefined;
}> = (props) => {
  const { requestId } = props as { requestId: string };
  const { selectRequest } = useRequest() as requestContextInterface;

  const request = selectRequest(requestId as string);
  console.log(request);
  const [activeTab, setActiveTab] = React.useState("details");

  if (!request) return <LoadingSpinner />;
  return (
    <>
      <div className={"mt-10 w-full"}>
        <h1 className={`font-bold text-center text-primary-600 text-2xl`}>
          Request{" "}
          <span className={`font-bold text-primary-300 text-2x1`}>Details</span>
        </h1>
      </div>
      <div className="w-8/12 mx-auto mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul
          className="flex flex-wrap text-sm
        font-medium text-center text-gray-500 border-b border-gray-200
        rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          id="defaultTab"
        >
          <li className="mr-2">
            <button
              id="details-tab"
              type="button"
              className={`${
                activeTab === "details" &&
                "text-primary-500 hover:text-primary-700"
              } inline-block p-4 hover:text-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-gray-300`}
              onClick={() => setActiveTab("details")}
            >
              Main Details
            </button>
          </li>
          <li className="mr-2">
            <button
              id="actions-tab"
              type="button"
              className={`${
                activeTab === "actions" &&
                "text-primary-500 hover:text-primary-700"
              } inline-block p-4 hover:text-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-gray-300`}
              onClick={() => setActiveTab("actions")}
            >
              Actions
            </button>
          </li>
          <li className="mr-2">
            <button
              id="statistics-tab"
              type="button"
              role="tab"
              className={`${
                activeTab === "statistics" &&
                "text-primary-500 hover:text-primary-700"
              } inline-block p-4 hover:text-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-gray-300`}
              onClick={() => setActiveTab("statistics")}
            >
              Facts
            </button>
          </li>
        </ul>
        <div id="defaultTabContent">
          <div
            className={`
          ${
            activeTab !== "details" && "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="details"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {request.title}
            </h2>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Clients Description:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {request.description}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Created at:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {formatDate(request.createdAt)}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Status:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {request.reqStatus.toUpperCase()}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Client:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {request.ownerName}
            </p>
          </div>
          <div
            className={`${
              activeTab !== "actions" && "hidden"
            }  p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="actions"
          >
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Actions
            </h2>
            <TaskToDesignForm reqId={props.requestId as string} />
          </div>
          <div
            className={`${
              activeTab !== "statistics" && "hidden"
            }  p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="statistics"
          >
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
              <div className="flex flex-col">
                <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                <dd className="text-gray-500 dark:text-gray-400">Developers</dd>
              </div>
              <div className="flex flex-col">
                <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  Public repositories
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  Open source projects
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;

//TODO make it reusable
