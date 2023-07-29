import React from "react";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import DefaultUserDetail from "@/components/helpers/DefaultUserDetail/DefaultUserDetail";

const AssignedUserDetail: React.FC<{
  userId: string | string[] | undefined;
}> = (props) => {
  const { selectUser } = useAuth() as authContextInterface;

  const selectedUser = selectUser(props.userId as string);

  return <DefaultUserDetail selectedUser={selectedUser} role={"am"} />;
};

export default AssignedUserDetail;
