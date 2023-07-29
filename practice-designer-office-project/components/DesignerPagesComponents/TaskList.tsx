import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DefaultDesignList from "@/components/helpers/Lists/DefaultDesignList/DefaultDesignList";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import SearchBar from "@/components/helpers/SearchBar/SearchBar";
import { formatDate } from "@/components/helpers/helper-functions/format-date";
import FilterButtons from "@/components/helpers/FilterButtons/FillterButtons";

const TaskList = () => {
  const { myComingDesigns, designLoading, designError } =
    useRequest() as requestContextInterface;
  const [searchTerm, setSearchTerm] = React.useState("");

  const settingSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const [isSorted, setIsSorted] = React.useState(false);
  // sort designs by date
  const sortedDesigns = myComingDesigns?.sort((a, b) => {
    return isSorted
      ? a.createdAt > b.createdAt
        ? -1
        : 1
      : a.createdAt < b.createdAt
      ? -1
      : 1;
  });
  const filteredRequests = sortedDesigns?.filter((request) => {
    const requestTitle = request.title.toLowerCase();
    const searchTermFixed = searchTerm.toLowerCase();
    const formattedDate = formatDate(request.updatedAt).toLowerCase();
    const requestAm = request.amName.toLowerCase();
    const designStatus = request.designStatus.toLowerCase();
    return (
      requestTitle.includes(searchTermFixed) ||
      formattedDate.includes(searchTermFixed) ||
      requestAm.includes(searchTermFixed) ||
      designStatus.includes(searchTermFixed)
    );
  });
  const segments = [
    {
      name: "",
      buttonTitle: "All Tasks",
    },
    {
      name: "pending",
      buttonTitle: "Pending Tasks",
    },
    {
      name: "ongoing",
      buttonTitle: "Ongoing Tasks",
    },
    {
      name: "waiting for approval",
      buttonTitle: "Waiting Manager Approval",
    },
    {
      name: "approved",
      buttonTitle: "Approved",
    },
  ];

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
      <FilterButtons
        setActiveButton={setSearchTerm}
        segments={segments}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
      />
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
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
