import React, { useEffect } from "react";
import { formatDateTime } from "@/components/helpers/helper-functions/format-date";
import { DocumentData } from "@firebase/firestore";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import Link from "next/link";
import SuccessSvg from "@/components/helpers/SuccesSvg/SuccessSvg";
import { useNotification } from "@/context/notification-context";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";

const DesignAmItemCard: React.FC<{
  itemId: string | string[] | undefined;
  item: DocumentData | undefined;
}> = (props) => {
  // variables and functions
  const { approveDesign, rejectDesign, creatingError, creatingLoading } =
    useRequest() as requestContextInterface;
  // states
  const [activeTab, setActiveTab] = React.useState("details");
  const [rejecting, setRejecting] = React.useState(false);
  const [imageIsOpen, setImageIsOpen] = React.useState(false);
  const briefRef = React.useRef<HTMLTextAreaElement>(null);
  if (!props.item) return <LoadingSpinner />;
  //notification context
  const { showNotification } =
    useNotification() as notificationContextInterface;

  // functions
  const rejectHandler = async () => {
    if (!briefRef.current) return;
    const brief = briefRef.current.value;
    if (!brief || brief.trim().length === 0) {
      return showNotification({
        status: "error",
        title: "Error",
        message: "Brief can not be empty",
      });
    }
    await showNotification({
      status: "loading",
      title: "Sending to designer",
      message: "Design is sending to designer with your updated brief...",
    });
    await rejectDesign(props.itemId as string, brief);
    setRejecting(false);
    await showNotification({
      status: "info",
      title: "Design sent back to designer",
      message:
        "Design is sent back to designer successfully. You can see it in design list. Waiting for designer process now.",
    });
  };

  const approveHandler = async () => {
    await showNotification({
      status: "loading",
      title: "Sending to client",
      message: "Design is sending to client...",
    });
    await approveDesign(props.itemId as string);
    await showNotification({
      status: "info",
      title: "Design sent to client",
      message:
        "Design is sent to client successfully. You can see it in request list. Waiting for client approval now.",
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
    <>
      <div className={"mt-10 w-full"}>
        {creatingLoading && (
          <div className="fixed inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
        )}
        <h1 className={`font-bold text-center text-primary-600 text-2xl`}>
          Design{" "}
          <span className={`font-bold text-primary-300 text-2x1`}>Process</span>
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
              id="explanation-tab"
              type="button"
              className={`${
                activeTab === "explanation" &&
                "text-primary-500 hover:text-primary-700"
              } inline-block p-4 hover:text-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-gray-300`}
              onClick={() => setActiveTab(`explanation`)}
            >
              Explanation
            </button>
          </li>
          <li className="mr-2">
            <button
              id="explanation-tab"
              type="button"
              className={`${
                activeTab === "process" &&
                "text-primary-500 hover:text-primary-700"
              } inline-block p-4 hover:text-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-gray-300`}
              onClick={() => setActiveTab(`process`)}
            >
              Approval Process
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
              You can find designs main details here.
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Request Title:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.title}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Clients Name:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.ownerName}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Created at:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {formatDateTime(props.item.createdAt)}
            </p>
            <p className="mb-2 text-primary-500 dark:text-primary-500">
              Last Process At:
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
              Designed By:
            </p>
            <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
              {props.item.designerId}
            </p>
          </div>
          <div
            className={`w-full ${
              activeTab !== "explanation" && "hidden"
            }  p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="explanation"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Explanation
            </h2>
            <p className="mb-4 italic text-gray-500 text-sm dark:text-gray-400">
              You can find clients description, your brief and designers note
              here.
            </p>
            <h3 className="mb-2 text-primary-500 dark:text-white">
              Clients Description:
            </h3>
            <p className="mb-3 text-gray-800 text-sm dark:text-gray-400">
              {props.item.description}
            </p>
            <h3 className="mb-2 text-primary-500 dark:text-white">
              Your Brief:
            </h3>
            <p className="mb-3 text-gray-800 text-sm dark:text-gray-400">
              {props.item.amNote}
            </p>
            <h3 className="mb-2 text-primary-500 dark:text-white">
              Designer Note:
            </h3>
            <p className="mb-3 text-gray-800 text-sm dark:text-gray-400">
              {props.item.designerNote ||
                "No note added yet. Waiting for design process."}
            </p>
          </div>
          <div
            className={`
          ${
            activeTab !== "process" && "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
            id="details"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Approval Process
            </h2>
            <p className="mb-4 italic text-gray-500 text-sm dark:text-gray-400">
              You approve or reject designs here.
            </p>
            {/* TODO: add imageURL here if needed */}
            {creatingLoading ? (
              <LoadingSpinner />
            ) : creatingError ? (
              <p>Error</p>
            ) : props.item.designStatus === "approved" ? (
              <div className={"flex flex-col items-center gap-3 w-full mt-5"}>
                <div className={"flex row items-start gap-2"}>
                  <SuccessSvg className={"w-5 h-5 text-green-500"} />
                  <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                    This design has been approved by you and sent to the client.
                    You can follow client approval from{" "}
                    <Link
                      className={"text-primary-500"}
                      href={`/am/request-list/${props.item.id}`}
                    >
                      request detail.
                    </Link>
                  </p>
                </div>
                {!imageIsOpen ? (
                  <button
                    onClick={() => {
                      setImageIsOpen(true);
                    }}
                    className="hover:text-primary-500 
                text-sm text-gray-400 mt-1"
                  >
                    Show Design
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setImageIsOpen(false);
                      }}
                      className="hover:text-primary-500 
                text-sm text-gray-400 mt-1"
                    >
                      Hide Design
                    </button>
                    <h3 className="block mb-2 text-lg font-medium text-primary-500 dark:text-white">
                      Design Image
                    </h3>
                    <img
                      src={"/default-img.png"}
                      alt={"default image"}
                      className={"w-6/12 h-6/12"}
                    />
                    <button className="hover:text-primary-500 text-sm text-gray-400 mt-3">
                      Click for download
                    </button>
                  </>
                )}
              </div>
            ) : props.item.designStatus !== "waiting for approval" ? (
              <div className={"flex row items-start gap-2"}>
                <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                  Waiting for designer.
                </p>
              </div>
            ) : (
              <div className={"flex flex-col items-center gap-3 w-full mt-5"}>
                <h3 className="block mb-2 text-lg font-medium text-primary-500 dark:text-white">
                  Design Image
                </h3>
                <img
                  src={"/default-img.png"}
                  alt={"default image"}
                  className={"w-6/12 h-6/12"}
                />
                <button className="hover:text-primary-500 text-sm text-gray-400 mt-3">
                  Click for download
                </button>
                <div
                  className={
                    "flex flex-col-reverse w-full self-end items-end justify-end"
                  }
                >
                  {!rejecting && (
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-3"
                      onClick={approveHandler}
                    >
                      Accept and Send To Client
                    </button>
                  )}
                  {!rejecting ? (
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-3"
                      onClick={() => setRejecting(true)}
                    >
                      Reject
                    </button>
                  ) : (
                    <div className={"w-full flex flex-col"}>
                      <form>
                        <label
                          htmlFor="brief"
                          className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
                        >
                          Update Your Brief
                        </label>
                        <textarea
                          id="brief"
                          rows={15}
                          className="mb-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                          border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          ref={briefRef}
                          placeholder={
                            "Your previous brief:" + "\n" + props.item.amNote
                          }
                        ></textarea>
                      </form>
                      <button
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-3 w-1/2 self-end"
                        onClick={rejectHandler}
                      >
                        Reject And Update Brief
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
              </div>
            )}
          </div>
          <div
            className={
              "flex flex-row justify-end m-3 hover:text-primary-500 text-sm text-gray-400"
            }
          >
            <Link href={"/am/design-approval"}> Back to Designs</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignAmItemCard;

// todo: Add sent at date and all process dates to the design item
// todo: plan the object of reqs and designs etc. add designer name to the design object, remove unnecessary fields from the design object
// todo: add ux for details which use refs really !
// todo: fix profile update
