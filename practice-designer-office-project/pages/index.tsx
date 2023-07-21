import React from "react";
import { useRequest } from "@/context/request-context";
import { requestContextInterface } from "@/interfaces/request-context-interface";

const HomePage = () => {
  const { value } = useRequest() as requestContextInterface;
  console.log(value);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
