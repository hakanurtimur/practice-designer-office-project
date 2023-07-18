import React, { Fragment } from "react";
import ClientMainNavigation from "@/components/Layout/ClientMainNavigation";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import UnsubscribedMainNavigation from "@/components/Layout/UnsubscribedMainNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth() as authContextInterface;

  return (
    <Fragment>
      <header>
        {!user ? <UnsubscribedMainNavigation /> : <ClientMainNavigation />}
        {/*  waiting for userRole  */}
      </header>
      {children}
    </Fragment>
  );
};

export default Layout;
