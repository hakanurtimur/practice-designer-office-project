import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";
const ClientMainNavigation = () => {
  const contentArray = [
    {
      title: "Dashboard",
      link: "",
    },
    {
      title: "Requests",
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
  ];

  const buttonArray = [
    {
      title: "Sign out",
      function: () => {
        console.log("Sign out");
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

export default ClientMainNavigation;
