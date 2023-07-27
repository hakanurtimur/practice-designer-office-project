import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DefaultAmDesignList from "@/components/helpers/Lists/DefaultAmDesignList/DefaultAmDesignList";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import SearchBar from "@/components/helpers/SearchBar/SearchBar";
import { formatDate } from "@/components/helpers/helper-functions/format-date";

const DesignList = () => {
  const { myDutyDesigns, designLoading, designError } =
    useRequest() as requestContextInterface;
  const [searchTerm, setSearchTerm] = React.useState("");
  const settingSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const filteredRequests = myDutyDesigns?.filter((request) => {
    const requestTitle = request.title.toLowerCase();
    const searchTermFixed = searchTerm.toLowerCase();
    const formattedDate = formatDate(request.updatedAt).toLowerCase();
    const requestDesigner = request.designerId.toLowerCase();
    return (
      requestTitle.includes(searchTermFixed) ||
      formattedDate.includes(searchTermFixed) ||
      requestDesigner.includes(searchTermFixed)
    );
  });

  return (
    <div className={"mx-auto my-10 flex flex-col items-center gap-10 w-full"}>
      <h1 className={`font-bold text-primary-600  text-2xl`}>
        Designs{" "}
        <span className={`font-bold text-primary-300 text-2x1`}>
          On Process
        </span>
      </h1>
      <div className={"w-8/12"}>
        <SearchBar
          content={"requests"}
          placeholder={"Search title, date or designer"}
          filter={settingSearchTerm}
        />
      </div>
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

// TODO: prepare details page for design

// TODO: maybe we can sort the requests and designs by date
// Todo: maybe we can add designer name
