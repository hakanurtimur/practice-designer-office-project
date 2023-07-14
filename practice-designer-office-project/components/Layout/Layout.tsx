import React, { Fragment } from "react";
import MainNavigation from "@/components/Layout/MainNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <MainNavigation />
      {children}
    </Fragment>
  );
};

export default Layout;
