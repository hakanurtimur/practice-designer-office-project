import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";
import { useNotification } from "@/context/notification-context";

const SuperAdminMainNavigation = () => {
  const { signOut, signOutLoading } = useAuth() as authContextInterface;
  const { showNotification } =
    useNotification() as notificationContextInterface;

  const contentArray = [
    {
      title: "Dashboard",
      link: "/admin",
    },
    {
      title: "Project List",
      link: "/admin/project-list",
    },
    {
      title: "Profile Setting",
      link: "/admin/profile",
    },
    {
      title: "Message Center",
      link: "/admin/message-center",
    },
    {
      title: "User Management",
      link: "/admin/user-management",
    },
  ];

  const buttonArray = [
    {
      title: "Sign out",
      function: async () => {
        await showNotification({
          title: "Loading",
          message: "Signing out...",
          status: "loading",
        });
        await signOut();
        await showNotification({
          title: "Success",
          message: "Signed out.",
          status: "success",
        });
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
