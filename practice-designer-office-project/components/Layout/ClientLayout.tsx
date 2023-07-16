import React, { Fragment } from "react";
import ClientMainNavigation from "@/components/Layout/ClientMainNavigation";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <header>
        <ClientMainNavigation />
      </header>
      {children}
    </Fragment>
  );
};

export default ClientLayout;
