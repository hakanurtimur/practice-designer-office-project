import React from "react";
import RequestDetail from "@/components/ClientPagesComponent/RequestsList/RequestDetail";
import { useRouter } from "next/router";

const RequestDetailPage = () => {
  const router = useRouter();
  const { requestId } = router.query;
  return <RequestDetail requestId={requestId} />;
};

export default RequestDetailPage;
