import React from "react";
import Link from "next/link";

const AssignedUserListItem = () => {
  return (
    <div>
      <h1>Assigned User</h1>
      {/* <div className="assigned-user-list-item"> */}
      <Link href={"/"}>Details</Link>
    </div>
  );
};

export default AssignedUserListItem;
