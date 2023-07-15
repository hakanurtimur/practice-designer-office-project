import React from "react";
import Link from "next/link";
import AdminDashboard from "@/components/SuperAdminPagesComponents/AdminDashboard";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminDashboard />
      {/* <SubNavigation /> */}
      <Link href={"/admin/user-management"}>User Management</Link>
      <Link href={"/admin/message-center"}>Message Center</Link>
      <Link href={"/admin/project-list"}>Project List</Link>
    </div>
  );
};

export default AdminPage;
