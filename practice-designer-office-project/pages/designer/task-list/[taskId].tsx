import React from "react";
import TaskDetail from "@/components/DesignerPagesComponents/TaskDetail";
import { useRouter } from "next/router";

const TaskDetailPage = () => {
  const router = useRouter();
  const { taskId } = router.query;

  return <TaskDetail taskId={taskId} />;
};

export default TaskDetailPage;
