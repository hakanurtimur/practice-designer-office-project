import React from "react";
import { useRouter } from "next/router";
import DesignDetail from "@/components/AccountManagerPagesComponents/DesignerApproval/DesignDetail";

const TaskDetailPage = () => {
  const router = useRouter();
  const { designId } = router.query;

  return <DesignDetail designId={designId} />;
};

export default TaskDetailPage;
