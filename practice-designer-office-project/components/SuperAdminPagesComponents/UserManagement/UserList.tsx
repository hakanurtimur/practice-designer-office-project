import React from "react";
import SearchBar from "@/components/helpers/SearchBar/SearchBar";
import DefaultUserList from "@/components/helpers/Lists/DefaultUserList/DefaultUserList";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import { useAuth } from "@/context/auth-context";

const UserList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { allUsers } = useAuth() as authContextInterface;

  const settingSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const searchBarProps = {
    placeholder: "Search for a user",
    content: "Search for a user",
  };

  const users =
    allUsers &&
    allUsers.map((user) => {
      return {
        name: user.name,
        email: user.email,
        assignedAmName: user.assignedAmName,
        imageSrc: user.photoURL,
        id: user.id,
      };
    });

  const filteredUsers = users?.filter((user) => {
    const userName = user.name.toLowerCase();
    const userEmail = user.email.toLowerCase();
    const userAssignedAmName = user.assignedAmName.toLowerCase();
    const searchTermFixed = searchTerm.toLowerCase();
    return (
      userName.includes(searchTermFixed) ||
      userEmail.includes(searchTermFixed) ||
      userAssignedAmName.includes(searchTermFixed) ||
      user.assignedAmName.includes(searchTermFixed)
    );
  });

  // for now users is seems with their id's

  return (
    <div className={"mx-auto my-10 flex flex-col items-center gap-10 w-full"}>
      <h1 className={`font-bold text-primary-600  text-2xl`}>
        User <span className={`font-bold text-primary-300 text-2x1`}>List</span>
      </h1>
      <div className={"w-8/12"}>
        <SearchBar {...searchBarProps} filter={settingSearchTerm} />
      </div>
      <div className={"w-8/12"}>
        <DefaultUserList
          role={"admin"}
          searchTerm={searchTerm}
          users={filteredUsers}
        />
      </div>
    </div>
  );
};

export default UserList;
