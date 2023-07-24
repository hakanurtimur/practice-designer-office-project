import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";

const AccountManagerMainNavigation = () => {
  const { signOut, signOutLoading } = useAuth() as authContextInterface;

  const contentArray = [
    {
      title: "Dashboard",
      link: "/am",
    },
    {
      title: "Requests",
      link: "/am/request-list",
    },
    {
      title: "Assigned Users",
      link: "/am/assigned-users",
    },
    {
      title: "Profile Setting",
      link: "/am/profile",
    },
    {
      title: "Message Center",
      link: "/",
    },
    {
      title: "Design Approval",
      link: "/am/design-approval",
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

export default AccountManagerMainNavigation;
