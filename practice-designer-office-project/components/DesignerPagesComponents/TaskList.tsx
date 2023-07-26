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
    "text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none " +
    "focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 " +
    "text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800";
  const settingSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const filteredRequests = myComingDesigns?.filter((request) => {
    const requestTitle = request.title.toLowerCase();
    const searchTermFixed = searchTerm.toLowerCase();
    const formattedDate = formatDate(request.updatedAt).toLowerCase();
    const requestAm = request.amName.toLowerCase();
    return (
      requestTitle.includes(searchTermFixed) ||
      formattedDate.includes(searchTermFixed) ||
      requestAm.includes(searchTermFixed)
    );
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
          placeholder={"Search with title or date"}
          filter={settingSearchTerm}
        />
      </div>
      <div className={"w-6/12 flex flex-row justify-between"}>
        <button
          type="submit"
          className={
            buttonStyles + " " + (activeButton === "all" && "bg-primary-800")
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
            (activeButton === "pending" && "bg-primary-800")
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
            (activeButton === "ongoing" && "bg-primary-800")
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
            (activeButton === "finished" && "bg-primary-800")
          }
          onClick={() => setActiveButton("finished")}
        >
          Finished Tasks
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
