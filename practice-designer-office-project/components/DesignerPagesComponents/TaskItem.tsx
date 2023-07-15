import React from "react";
import Link from "next/link";

const TaskItem = () => {
  return (
    <div>
      <h1>Task Item</h1>
      <Link href={"/"}>Details</Link>
    </div>
  );
};

export default TaskItem;
