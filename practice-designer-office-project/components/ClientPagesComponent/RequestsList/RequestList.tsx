import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DefaultRequestList from "@/components/helpers/DefaultRequestList/DefaultRequestList";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import SearchBar from "@/components/helpers/SearchBar/SearchBar";
import { formatDate } from "../../helpers/helper-functions/format-date";

const RequestList = () => {
  const { thisClientsRequests, loading, error } =
    useRequest() as requestContextInterface;
  const [searchTerm, setSearchTerm] = React.useState("");
  const settingSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const filteredRequests = thisClientsRequests?.filter((request) => {
    const requestTitle = request.title.toLowerCase();
    const searchTermFixed = searchTerm.toLowerCase();
    const formattedDate = formatDate(request.createdAt).toLowerCase();
    return (
      requestTitle.includes(searchTermFixed) ||
      formattedDate.includes(searchTermFixed)
    );
  });

  return (
    <div className={"mx-auto my-10 flex flex-col items-center gap-10 w-full"}>
      <h1 className={`font-bold text-primary-600  text-2xl`}>
        Your{" "}
        <span className={`font-bold text-primary-300 text-2x1`}>Requests</span>
      </h1>
      <div className={"w-8/12"}>
        <SearchBar
          content={"requests"}
          placeholder={"Search with title or date"}
          filter={settingSearchTerm}
        />
      </div>
      {loading && <LoadingSpinner />}
      {loading && (
        <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      {error ? (
        <p>{error.message}</p>
      ) : filteredRequests?.length === 0 ? (
        <p>There is no request</p>
      ) : (
        <div className={"w-8/12"}>
          <DefaultRequestList
            requests={filteredRequests}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
};

export default RequestList;
