import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import DefaultRequestList from "@/components/helpers/DefaultRequestList/DefaultRequestList";

const RequestList = () => {
  const { value } = useRequest() as requestContextInterface;
  console.log(value);
  return (
    <div>
      <DefaultRequestList />
    </div>
  );
};

export default RequestList;
