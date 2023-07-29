import React, { useEffect } from "react";
import { formatDate } from "@/components/helpers/helper-functions/format-date";
import { DocumentData } from "@firebase/firestore";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import Link from "next/link";
import SuccessSvg from "@/components/helpers/SuccesSvg/SuccessSvg";
import { useNotification } from "@/context/notification-context";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";

const DefaultDetailsCard: React.FC<{
  itemId: string | string[] | undefined;
  title1: string;
  title2: string;
  item: DocumentData | undefined;
  waitingForContent: string;
}> = (props) => {
  // req context
  const { creatingError, creatingLoading } =
    useRequest() as requestContextInterface;
  //notification context
  const { showNotification } =
    useNotification() as notificationContextInterface;
  // states
  const [activeTab, setActiveTab] = React.useState("details");
  const [rejecting, setRejecting] = React.useState(false);
  //ref
  const revisionNoteRef = React.useRef<HTMLTextAreaElement>(null);
  const { approveRequest, rejectRequest } =
    useRequest() as requestContextInterface;

  if (!props.item) return <LoadingSpinner />;

  const handleApprove = async () => {
    await showNotification({
      title: "Loading",
      message: "Please wait...",
      status: "loading",
    });
    await approveRequest(props.itemId as string);
    await showNotification({
      title: "Success",
      message:
        "Your request has been approved. You can download your design now.",
      status: "success",
    });
  };
  const handleReject = async () => {
    if (!revisionNoteRef.current) return;
    const note = revisionNoteRef.current.value;
    if (!note || note.trim.length === 0) {
      return showNotification({
        title: "Error",
        message: "Please add your new description.",
        status: "error",
      });
    }
    await showNotification({
      title: "Loading",
      message: "Please wait...",
      status: "loading",
    });
    await rejectRequest(props.itemId as string, note);
    await showNotification({
      title: "Information",
      message:
        "Your request has been rejected and has been sent to us with your new brief. " +
        "You can follow your request process in the request list.",
      status: "info",
    });
    setRejecting(false);
  };

  useEffect(() => {
    if (creatingError) {
      showNotification({
        title: "Error",
        message: creatingError.message,
        status: "error",
      });
    }
  }, [creatingError]);

  return (
    <>
      {creatingLoading && (
        <div className="fixed inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      <div className={"mt-10 w-full"}>
        <h1 className={`font-bold text-center text-primary-600 text-2xl`}>
          Request{" "}
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
              Your Actions
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
              Main Details
            </h2>
            <p className="mb-4 italic text-gray-500 text-sm dark:text-gray-400">
              You can find your requests main details here.
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Request Title:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.title}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Your Description:
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
          </div>
          <div
            className={`${
              activeTab !== "actions" && "hidden"
            }  p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="actions"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Review Actions
            </h2>
            <p className="mb-4 italic text-gray-500 text-sm dark:text-gray-400">
              When your requests design process end you can approve or reject
              design here.
            </p>
            {props.item.reqStatus === "pending" ? (
              <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                There is no available actions for this request. Waiting for send
                to designer.
              </p>
            ) : props.item.reqStatus === "Sent to designer" ? (
              <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                Your request has been send to designer. There is no available
                actions for this request. Waiting for designer process.
              </p>
            ) : creatingLoading ? (
              <LoadingSpinner />
            ) : creatingError ? (
              <div className="flex items-center justify-center">
                <p className="text-red-500 text-sm font-medium">
                  {creatingError.message}
                </p>
              </div>
            ) : (
              <div className={"w-full h-full flex items-center flex-col"}>
                <h3 className="block mb-2 text-lg font-medium text-primary-500 dark:text-white">
                  Design Image
                </h3>
                <img
                  src={"/default-img.png"}
                  alt={"default image"}
                  className={"w-6/12 h-6/12"}
                />
                {props.item.reqStatus === "approved" ? (
                  <>
                    <div className={"flex flex-row gap-3  mt-5"}>
                      {/* TODO: add imageURL here if needed */}
                      <SuccessSvg className={"w-5 h-5 text-green-500"} />
                      <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                        Your design is ready!
                      </p>
                    </div>
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-5"
                    >
                      Download
                    </button>
                  </>
                ) : !rejecting ? (
                  <div className={"flex flex-row w-1/2 justify-between"}>
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-5"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-5"
                      onClick={() => setRejecting(true)}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className={"w-full flex flex-col"}>
                    <form>
                      <label
                        htmlFor="note"
                        className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
                      >
                        Update Your Note
                      </label>
                      <textarea
                        id="note"
                        rows={15}
                        className="mb-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                          border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        ref={revisionNoteRef}
                        placeholder={
                          "Your old brief:" + "\n" + props.item.description
                        }
                      ></textarea>
                    </form>
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-3  self-end"
                      onClick={handleReject}
                    >
                      Revision with Note
                    </button>
                    <button
                      className="hover:text-primary-500 text-sm text-gray-400 self-end mt-3"
                      onClick={() => setRejecting(false)}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className={
              "flex flex-row justify-end m-3 hover:text-primary-500 text-sm text-gray-400"
            }
          >
            <Link href={"/client/request-list"}> Back to Requests</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDetailsCard;
// todo: fix am request details

// todo: when download design add notifications on them, do same for profile image uploading states
