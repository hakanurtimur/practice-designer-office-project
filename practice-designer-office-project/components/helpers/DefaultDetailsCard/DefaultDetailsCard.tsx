import React from "react";
import {
  formatDate,
  formatDateTime,
} from "@/components/helpers/helper-functions/format-date";
import TaskToDesignForm from "@/components/helpers/TaskToDesignForm/TaskToDesignForm";
import { DocumentData } from "@firebase/firestore";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import Link from "next/link";

const DefaultDetailsCard: React.FC<{
  itemId: string | string[] | undefined;
  title1: string;
  title2: string;
  role: string;
  item: DocumentData | undefined;
  waitingForContent: string;
}> = (props) => {
  const { creatingError, creatingLoading } =
    useRequest() as requestContextInterface;
  const [activeTab, setActiveTab] = React.useState("details");
  if (!props.item) return <LoadingSpinner />;
  return (
    <>
      <div className={"mt-10 w-full"}>
        <h1 className={`font-bold text-center text-primary-600 text-2xl`}>
          {props.title1}{" "}
          <span className={`font-bold text-primary-300 text-2x1`}>
            {props.title2}
          </span>
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
              onClick={() => setActiveTab(`actions`)}
            >
              {props.role} Actions
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
              Created at:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {formatDate(props.item.createdAt)}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Status:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.reqStatus.toUpperCase()}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Client:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.ownerName}
            </p>
          </div>
          <div
            className={`${
              activeTab !== "actions" && "hidden"
            }  p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="actions"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props.role} Actions
            </h2>
            {props.item.reqStatus === "pending" ? (
              <TaskToDesignForm reqId={props.itemId as string} />
            ) : !creatingLoading ? (
              <>
                <p className="mb-2 text-primary-500 dark:text-primary-500">
                  There is no available actions for this {props.role}.
                </p>
                <p className="mb-2 text-gray-500 text-sm dark:text-gray-400">
                  This item {props.item.reqStatus} (to Designer 1 at{" "}
                  {props.item.updatedAt && formatDateTime(props.item.updatedAt)}
                  ). {props.waitingForContent}
                </p>
                <p className="mb-2 text-gray-500 text-sm dark:text-gray-400">
                  For more information please go to{" "}
                  {props.role === "Request" && (
                    <Link
                      href={`/am/design-approval/${props.item.id}`}
                      className="mb-2 text-primary-500 dark:text-primary-500"
                    >
                      design detail.
                    </Link>
                  )}
                </p>
              </>
            ) : !creatingError ? (
              <LoadingSpinner />
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-red-500 text-sm font-medium">
                  {creatingError.message}
                </p>
              </div>
            )}
          </div>
          <div
            className={
              "flex flex-row justify-end m-3 hover:text-primary-500 text-sm text-gray-400"
            }
          >
            <Link href={"/am/request-list"}> Back to Requests</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDetailsCard;
