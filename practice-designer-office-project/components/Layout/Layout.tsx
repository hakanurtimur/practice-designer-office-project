import React, { Fragment } from "react";
import ClientMainNavigation from "@/components/Layout/ClientMainNavigation";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import UnsubscribedMainNavigation from "@/components/Layout/UnsubscribedMainNavigation";
import SuperAdminMainNavigation from "@/components/Layout/SuperAdminMainNavigation";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = React.useState<string | undefined>(undefined); // ["client", "superadmin"
  const { user, getUserRole } = useAuth() as authContextInterface;

  const handleUserRole = async () => {
    if (user) {
      const role = await getUserRole();
      setUserRole(role);
    }
  };

  handleUserRole().then();

  return (
    <Fragment>
      <header>
        {!user ? (
          <UnsubscribedMainNavigation />
        ) : userRole === "client" ? (
          <ClientMainNavigation />
        ) : (
          <SuperAdminMainNavigation />
        )}
        {/*  waiting for userRole  */}
      </header>
      {children}
    </Fragment>
  );
};

export default Layout;
