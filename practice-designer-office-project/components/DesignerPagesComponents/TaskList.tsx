import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DefaultDesignList from "@/components/helpers/Lists/DefaultDesignList/DefaultDesignList";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import SearchBar from "@/components/helpers/SearchBar/SearchBar";
import { formatDate } from "@/components/helpers/helper-functions/format-date";

const TaskList = () => {
  const { myComingDesigns, designLoading, designError } =
    useRequest() as requestContextInterface;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeButton, setActiveButton] = React.useState("all");

  const buttonStyles =
    "text-gray-700 text-sm w-full sm:w-auto px-2 py-1 text-center dark:text-white-500";
  const settingSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const filteredRequests = myComingDesigns?.filter((request) => {
    const requestTitle = request.title.toLowerCase();
    const searchTermFixed = searchTerm.toLowerCase();
    const formattedDate = formatDate(request.updatedAt).toLowerCase();
    const requestAm = request.amName.toLowerCase();
    return activeButton !== "all"
      ? request.designStatus === activeButton &&
          (requestTitle.includes(searchTermFixed) ||
            formattedDate.includes(searchTermFixed) ||
            requestAm.includes(searchTermFixed))
      : requestTitle.includes(searchTermFixed) ||
          formattedDate.includes(searchTermFixed) ||
          requestAm.includes(searchTermFixed);
  });

  return (
    <div className={"mx-auto my-10 flex flex-col items-center gap-10 w-full"}>
      <h1 className={`font-bold text-primary-600  text-2xl`}>
        Your{" "}
        <span className={`font-bold text-primary-300 text-2x1`}>Tasks</span>
      </h1>
      <div className={"w-8/12"}>
        <SearchBar
          content={"requests"}
          placeholder={"Search title, date or AM"}
          filter={settingSearchTerm}
        />
      </div>
      <div className={"w-6/12 flex flex-row justify-around"}>
        <button
          type="submit"
          className={
            buttonStyles +
            " " +
            (activeButton === "all" && "text-primary-500 underline")
          }
          onClick={() => setActiveButton("all")}
        >
          All Tasks
        </button>
        <button
          type="submit"
          className={
            buttonStyles +
            " " +
            (activeButton === "pending" && "text-primary-500 underline")
          }
          onClick={() => setActiveButton("pending")}
        >
          Pending Tasks
        </button>
        <button
          type="submit"
          className={
            buttonStyles +
            " " +
            (activeButton === "ongoing" && "text-primary-500 underline")
          }
          onClick={() => setActiveButton("ongoing")}
        >
          Ongoing Tasks
        </button>
        <button
          type="submit"
          className={
            buttonStyles +
            " " +
            (activeButton === "waiting for approval" &&
              "text-primary-500 underline")
          }
          onClick={() => setActiveButton("waiting for approval")}
        >
          Finished Tasks
        </button>
        <button
          type="submit"
          className={
            buttonStyles +
            " " +
            (activeButton === "approved" && "text-primary-500 underline")
          }
          onClick={() => setActiveButton("approved")}
        >
          Approved Tasks
        </button>
      </div>
      {designLoading && <LoadingSpinner />}
      {designLoading && (
        <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      {designError ? (
        <p>{designError.message}</p>
      ) : filteredRequests?.length === 0 ? (
        <p>There is no task</p>
      ) : (
        <div className={"w-8/12"}>
          <DefaultDesignList
            designs={filteredRequests}
            searchTerm={searchTerm}
            role={"designer"}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
