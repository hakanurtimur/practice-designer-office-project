import React from "react";
import DefaultCarousel from "@/components/helpers/DefaultCarousel/DefaultCarousel";

const AccountManagerDashboard = () => {
  const items = [
    {
      content: "Clients",
      imageUrl: "/your-users.png",
      link: "/am/assigned-users",
    },
    {
      content: "Requests",
      imageUrl: "/projects.png",
      link: "/am/request-list",
    },
    {
      content: "Profile",
      imageUrl: "/user-settings.png",
      link: "/am/profile",
    },
    {
      content: "Messages",
      imageUrl: "/messages.png",
      link: "/am/message-center",
    },
    {
      content: "Design Approval",
      imageUrl: "/design.png",
      link: "/am/design-approval",
    },
  ];

  return (
    <div
      className={
        "h-80 w-full flex flex-col my-10 items-center gap-5 justify-between"
      }
    >
      <h1 className={`font-bold text-primary-600  text-2xl`}>
        Dash<span className={`font-bold text-primary-300 text-2x1`}>board</span>
      </h1>
      <DefaultCarousel items={items} />
    </div>
  );
};

export default AccountManagerDashboard;
