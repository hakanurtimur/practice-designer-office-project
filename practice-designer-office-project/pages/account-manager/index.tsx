import React, { Fragment } from "react";
import AccountManagerDashboard from "@/components/AccountManagerPagesComponents/AccountManagerDashboard";
import Link from "next/link";

const AccountManagerHomePage = () => {
  return (
    <Fragment>
      <AccountManagerDashboard />
      <Link href={"/"}>Request List</Link>
      <Link href={"/"}>Design Approval</Link>
      <Link href={"/"}>Assigned User</Link>
    </Fragment>
  );
};

export default AccountManagerHomePage;
