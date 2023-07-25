import React from "react";
import DefaultCarousel from "@/components/helpers/DefaultCarousel/DefaultCarousel";

const DesignerDashboard = () => {
  const items = [
    {
      content: "Task List",
      imageUrl: "/plus.png",
      link: "/designer/task-list",
    },
    {
      content: "Profile Settings",
      imageUrl: "/user-settings.png",
      link: "/designer/profile",
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

export default DesignerDashboard;
