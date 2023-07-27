import React from "react";
import { formatDateTime } from "@/components/helpers/helper-functions/format-date";
import { DocumentData } from "@firebase/firestore";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import Link from "next/link";
import SuccessSvg from "@/components/helpers/SuccesSvg/SuccessSvg";

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
  const briefRef = React.useRef<HTMLTextAreaElement>(null);
  if (!props.item) return <LoadingSpinner />;
  // functions

  const rejectHandler = async () => {
    if (!briefRef.current) return;
    const brief = briefRef.current.value;
    if (!brief) {
      setRejecting(false);
      return;
    }
    await rejectDesign(props.itemId as string, brief);
    setRejecting(false);
  };

  const approveHandler = async () => {
    await approveDesign(props.itemId as string);
  };
  return (
    <>
      <div className={"mt-10 w-full"}>
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
              Design Details
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
              {props.item.title}
            </h2>
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
            {/* TODO: add imageURL here if needed */}
            {creatingLoading ? (
              <LoadingSpinner />
            ) : creatingError ? (
              <p>Error</p>
            ) : props.item.designStatus === "approved" ? (
              <div className={"flex row items-start gap-2"}>
                <SuccessSvg className={"w-5 h-5 text-green-500"} />
                <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                  This design has been approved by you and sent to the client.
                </p>
              </div>
            ) : props.item.designStatus !== "waiting for approval" ? (
              <div className={"flex row items-start gap-2"}>
                <p className="mb-3 text-gray-500 text-sm dark:text-gray-400">
                  Waiting for designer.
                </p>
              </div>
            ) : (
              <div
                className={
                  "flex flex-col lg:flex-row items-start gap-10 w-full mt-5"
                }
              >
                <div className={"w-full h-full flex flex-col"}>
                  <h3 className="block mb-2 text-sm font-medium text-primary-500 dark:text-white">
                    Design Image
                  </h3>
                  <img
                    src={"/default-img.png"}
                    alt={"default image"}
                    className={"w-8/12 h-8/12"}
                  />
                  <button
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-5 self-start"
                  >
                    Download Image
                  </button>
                </div>
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
                          Add Your Brief
                        </label>
                        <textarea
                          id="brief"
                          rows={15}
                          className="mb-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
                          border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
                          dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Add your brief here..."
                          ref={briefRef}
                        ></textarea>
                      </form>
                      <button
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                  dark:focus:ring-primary-800 mt-3 w-1/2 self-end"
                        onClick={rejectHandler}
                      >
                        Reject And Add Brief
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
