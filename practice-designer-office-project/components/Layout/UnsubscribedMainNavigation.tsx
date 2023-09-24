import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const UnsubscribedMainNavigation = () => {
  const router = useRouter();

  const contentArray = [
    {
      title: "Home",
      link: "",
    },
  ];

  const buttonArray = [
    {
      title: "Login",
      function: async () => {
        await console.log("Login");
        await router.push("/auth/login");
      },
      id: uuidv4(),
    },
    {
      title: "Sign up",
      function: async () => {
        await console.log("Sign up");
        await router.push("/auth");
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

export default UnsubscribedMainNavigation;
