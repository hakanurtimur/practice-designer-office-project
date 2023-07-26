import React from "react";
import { formatDateTime } from "@/components/helpers/helper-functions/format-date";
import { DocumentData } from "@firebase/firestore";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import SuccessSvg from "@/components/helpers/SuccesSvg/SuccessSvg";
import FinishTaskForm from "@/components/helpers/FinishTaskForm/FinishTaskForm";

const DefaultDetailsCard: React.FC<{
  itemId: string | string[] | undefined;
  item: DocumentData | undefined;
  waitingForContent: string;
}> = (props) => {
  const [activeTab, setActiveTab] = React.useState("details");

  const { acceptDesign, creatingError, creatingLoading } =
    useRequest() as requestContextInterface;
  if (!props.item) return <LoadingSpinner />;
  return (
    <>
      <div className={"mt-10 w-full"}>
        <h1 className={`font-bold text-center text-primary-600 text-2xl`}>
          Design{" "}
          <span className={`font-bold text-primary-300 text-2x1`}>Details</span>
        </h1>
      </div>
      <div
        className="w-8/12 mx-auto mt-5 bg-white border border-gray-200
      rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
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
              Design Details
            </button>
          </li>
          <li className="mr-2">
            <button
              id="brief-tab"
              type="button"
              className={`${
                activeTab === "brief" &&
                "text-primary-500 hover:text-primary-700"
              } inline-block p-4 hover:text-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-gray-300`}
              onClick={() => setActiveTab(`brief`)}
            >
              Brief
            </button>
          </li>
          <li className="mr-2">
            <button
              id="brief-tab"
              type="button"
              className={`${
                activeTab === "process" &&
                "text-primary-500 hover:text-primary-700"
              } inline-block p-4 hover:text-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-gray-300`}
              onClick={() => setActiveTab(`process`)}
            >
              Task Process
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
              {props.item.title}
            </h2>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Clients Description:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.description}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Sent at:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {formatDateTime(props.item.updatedAt)}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Status:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.designStatus.toUpperCase()}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Manager:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.amName}
            </p>
          </div>
          <div
            className={`w-full ${
              activeTab !== "brief" && "hidden"
            }  p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="brief"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Brief
            </h2>
            <p className="mb-3 text-gray-800 text-sm dark:text-gray-400">
              {props.item.amNote}
            </p>
            {props.item.designStatus === "pending" ? (
              <>
                {creatingLoading ? (
                  <LoadingSpinner />
                ) : creatingError ? (
                  <div className="flex items-center justify-center">
                    <p className="text-red-500 text-sm font-medium">
                      {creatingError.message}
                    </p>
                  </div>
                ) : (
                  <button
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-3"
                    onClick={() => acceptDesign(props.itemId as string)}
                  >
                    Accept Design
                  </button>
                )}
              </>
            ) : (
              <div className={"flex flex-row gap-3  mt-5"}>
                <SuccessSvg className={"w-5 h-5 text-green-500"} />
                <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                  This design has been accepted. You can find actions in the{" "}
                  {""}
                  <button
                    onClick={() => setActiveTab("process")}
                    className="underline text-primary-500 dark:text-primary-500"
                  >
                    Task Process.
                  </button>
                </p>
              </div>
            )}
          </div>
          <div
            className={`
          ${
            activeTab !== "process" && "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="details"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Task Process
            </h2>
            {props.item.designStatus === "ongoing" ? (
              <FinishTaskForm designId={props.itemId as string} />
            ) : creatingLoading ? (
              <LoadingSpinner />
            ) : creatingError ? (
              <div className="flex items-center justify-center">
                <p className="text-red-500 text-sm font-medium">
                  {creatingError.message}
                </p>
              </div>
            ) : (
              <div className={"flex flex-row gap-3  mt-5"}>
                {/* TODO: add imageURL here if needed */}
                <SuccessSvg className={"w-5 h-5 text-green-500"} />
                <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                  Your design has been sent. Waiting for review.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDetailsCard;

// TODO: Add notifications
// TODO: Add upload image for pp s and tasks
// TODO: add success svg to all success messages and adding back button for details
// TODO: for dynamic sections we will add protecting system
