import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";

const DesignerMainNavigation = () => {
  const { signOut, signOutLoading } = useAuth() as authContextInterface;

  const contentArray = [
    {
      title: "Dashboard",
      link: "/designer",
    },
    {
      title: "Tasks",
      link: "/designer/task-list",
    },
    {
      title: "Profile Setting",
      link: "/designer/profile",
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

export default DesignerMainNavigation;
