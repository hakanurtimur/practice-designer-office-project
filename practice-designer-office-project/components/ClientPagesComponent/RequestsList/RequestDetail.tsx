import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import DefaultClientReqDetails from "@/components/helpers/DefaultClientReqDetails/DefaultClientReqDetails";

const RequestDetail: React.FC<{
  requestId: string | string[] | undefined;
}> = (props) => {
  const { requestId } = props as { requestId: string };
  const { selectRequest } = useRequest() as requestContextInterface;

  const request = selectRequest(requestId as string);
  console.log(request);

  if (!request) return <LoadingSpinner />;
  return (
    <DefaultClientReqDetails
      itemId={props.requestId}
      title1={"Request"}
      title2={"List"}
      item={request}
      waitingForContent={"Waiting for design."}
    />
  );
};

export default RequestDetail;
