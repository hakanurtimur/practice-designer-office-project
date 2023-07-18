import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
const SuperAdminMainNavigation = () => {
  const { signOut, signOutLoading } = useAuth() as authContextInterface;

  const contentArray = [
    {
      title: "Dashboard",
      link: "",
    },
    {
      title: "Project List",
      link: "",
    },
    {
      title: "Profile Setting",
      link: "",
    },
    {
      title: "Message Center",
      link: "",
    },
    {
      title: "User Management",
      link: "",
    },
  ];

  const buttonArray = [
    {
      title: "Sign out",
      function: async () => {
        await signOut();
        await console.log("Sign out");
        if (signOutLoading) {
          return <LoadingSpinner />;
        }
      },
      id: uuidv4(),
    },
  ];

  return (
    <MainNavigationSample
      buttonArray={buttonArray}
      contentArray={contentArray}
    />
  );
};

export default SuperAdminMainNavigation;
