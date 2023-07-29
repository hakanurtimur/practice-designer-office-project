import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DefaultAmDesignList from "@/components/helpers/Lists/DefaultAmDesignList/DefaultAmDesignList";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import SearchBar from "@/components/helpers/SearchBar/SearchBar";
import { formatDate } from "@/components/helpers/helper-functions/format-date";
import FilterButtons from "@/components/helpers/FilterButtons/FillterButtons";

const DesignList = () => {
  const { myDutyDesigns, designLoading, designError } =
    useRequest() as requestContextInterface;
  const [searchTerm, setSearchTerm] = React.useState("");
  // internal states
  const settingSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const [isSorted, setIsSorted] = React.useState(false);
  // sort designs by date
  const sortedDesigns = myDutyDesigns?.sort((a, b) => {
    return isSorted
      ? a.updatedAt > b.updatedAt
        ? -1
        : 1
      : a.updatedAt < b.updatedAt
      ? -1
      : 1;
  });
  const filteredRequests = (isSorted ? sortedDesigns : myDutyDesigns)?.filter(
    (request) => {
      const requestTitle = request.title.toLowerCase();
      const searchTermFixed = searchTerm.toLowerCase();
      const formattedDate = formatDate(request.updatedAt).toLowerCase();
      const requestDesigner = request.designerId.toLowerCase();
      const status = request.designStatus.toLowerCase();
      return (
        requestTitle.includes(searchTermFixed) ||
        formattedDate.includes(searchTermFixed) ||
        requestDesigner.includes(searchTermFixed) ||
        status.includes(searchTermFixed)
      );
    },
  );
  console.log(isSorted);
  const segments = [
    {
      name: "",
      buttonTitle: "All Designs",
    },
    {
      name: "pending",
      buttonTitle: "Pending Designs",
    },
    {
      name: "ongoing",
      buttonTitle: "Ongoing Designs",
    },
    {
      name: "waiting for approval",
      buttonTitle: "Waiting Your Approval",
    },
    {
      name: "approved",
      buttonTitle: "Approved Designs",
    },
  ];
  return (
    <div className={"mx-auto my-10 flex flex-col items-center gap-10 w-full"}>
      <h1 className={`font-bold text-primary-600  text-2xl`}>
        Design{" "}
        <span className={`font-bold text-primary-300 text-2x1`}>Approval</span>
      </h1>
      <div className={"w-8/12"}>
        <SearchBar
          content={"requests"}
          placeholder={"Search title, status, date or designer"}
          filter={settingSearchTerm}
        />
      </div>
      <FilterButtons
        isSorted={isSorted}
        setIsSorted={setIsSorted}
        segments={segments}
        setActiveButton={setSearchTerm}
      />
      {designLoading && <LoadingSpinner />}
      {designLoading && (
        <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      {designError ? (
        <p>{designError.message}</p>
      ) : filteredRequests?.length === 0 ? (
        <p>There is no design</p>
      ) : (
        <div className={"w-8/12"}>
          <DefaultAmDesignList
            designs={filteredRequests}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
};

export default DesignList;
