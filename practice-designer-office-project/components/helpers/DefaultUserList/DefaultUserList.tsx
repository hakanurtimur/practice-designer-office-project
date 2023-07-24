import React from "react";

const DefaultUserList: React.FC<{
  users:
    | {
        name: string;
        email: string;
        imageSrc: string;
        assignedAmName: string;
      }[]
    | undefined;
  searchTerm: string;
}> = (props) => {
  const { users } = props;
  if (!users) {
    return <div>loading...</div>;
  } else {
    return (
      <ul className="max-w-md divide-y  divide-gray-200 dark:divide-gray-700">
        {users.map((user, index) => (
          <li
            key={index}
            className={
              index === users.length - 1 ? "pt-3 pb-0 sm:pt-4" : "py-3 sm:py-4 "
            }
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.imageSrc}
                  alt={user.name}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user.name
                    .toLowerCase()
                    .includes(props.searchTerm.toLowerCase()) ? (
                    <>
                      {user.name
                        .split(new RegExp(`(${props.searchTerm})`, "gi"))
                        .map((part, index) => (
                          <React.Fragment key={index}>
                            {part.toLowerCase() ===
                            props.searchTerm.toLowerCase() ? (
                              <strong className="text-primary-600">
                                {part}
                              </strong>
                            ) : (
                              part
                            )}
                          </React.Fragment>
                        ))}
                    </>
                  ) : (
                    user.name
                  )}
                </p>

                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user.email
                    .toLowerCase()
                    .includes(props.searchTerm.toLowerCase()) ? (
                    <>
                      {user.email
                        .split(new RegExp(`(${props.searchTerm})`, "gi"))
                        .map((part, index) => (
                          <React.Fragment key={index}>
                            {part.toLowerCase() ===
                            props.searchTerm.toLowerCase() ? (
                              <strong className="text-primary-600">
                                {part}
                              </strong>
                            ) : (
                              part
                            )}
                          </React.Fragment>
                        ))}
                    </>
                  ) : (
                    user.email
                  )}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user.assignedAmName
                    .toLowerCase()
                    .includes(props.searchTerm.toLowerCase()) ? (
                    <>
                      {user.assignedAmName
                        .split(new RegExp(`(${props.searchTerm})`, "gi"))
                        .map((part, index) => (
                          <React.Fragment key={index}>
                            {part.toLowerCase() ===
                            props.searchTerm.toLowerCase() ? (
                              <strong className="text-primary-600">
                                {part}
                              </strong>
                            ) : (
                              part
                            )}
                          </React.Fragment>
                        ))}
                    </>
                  ) : (
                    user.assignedAmName
                  )}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
};

export default DefaultUserList;
