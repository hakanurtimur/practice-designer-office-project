import React from "react";
import RequestDetail from "@/components/AccountManagerPagesComponents/RequestsList/RequestDetails";
import { useRouter } from "next/router";

const RequestDetailPage = () => {
  const router = useRouter();
  const { requestId } = router.query;

  return <RequestDetail requestId={requestId} />;
};

export default RequestDetailPage;
