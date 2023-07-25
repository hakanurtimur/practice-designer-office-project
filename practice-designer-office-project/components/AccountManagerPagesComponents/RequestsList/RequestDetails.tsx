import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import DefaultDetailsCard from "@/components/helpers/DefaultDetailsCard/DefaultDetailsCard";

const RequestDetails: React.FC<{
  requestId: string | string[] | undefined;
}> = (props) => {
  const { requestId } = props as { requestId: string };
  const { selectRequest } = useRequest() as requestContextInterface;

  const request = selectRequest(requestId as string);
  console.log(request);

  if (!request) return <LoadingSpinner />;
  return (
    <DefaultDetailsCard
      itemId={props.requestId}
      title1={"Request"}
      title2={"List"}
      role={"Request"}
      item={request}
      waitingForContent={"Waiting for design."}
    />
  );
};

export default RequestDetails;
