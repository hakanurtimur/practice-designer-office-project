import React from "react";
import TaskList from "@/components/DesignerPagesComponents/TaskList";

const DesignerDashboard = () => {
  return (
    <div>
      <h1>Designer Dashboard</h1>
      {/* 5-6 sections for tasks → all tasks, acceptedByDesigner, ongoing, pending, waiting review*/}
      <TaskList />
    </div>
  );
};

export default DesignerDashboard;
