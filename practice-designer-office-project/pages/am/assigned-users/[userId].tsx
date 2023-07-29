import React from "react";
import AssignedUserDetail from "@/components/AccountManagerPagesComponents/AssignedUsersComponents/AssignedUserDetail";
import { useRouter } from "next/router";

const AssignedUserDetailPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  return <AssignedUserDetail userId={userId} />;
};

export default AssignedUserDetailPage;
