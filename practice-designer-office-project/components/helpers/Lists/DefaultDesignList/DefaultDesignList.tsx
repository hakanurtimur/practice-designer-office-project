import React from "react";
import { DocumentData } from "@firebase/firestore";
import { requestInterface } from "@/interfaces/request-context-interface";
import { formatDate } from "@/components/helpers/helper-functions/format-date";
import Link from "next/link";

const DefaultDesignList: React.FC<{
  designs: DocumentData | undefined;
  searchTerm: string;
}> = (props) => {
  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {props.designs?.map((item: requestInterface) => {
        return (
          <li key={item.id} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/projects.png"
                  alt="default image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Design Title:{" "}
                  {item.title
                    .toLowerCase()
                    .includes(props.searchTerm.toLowerCase()) ? (
                    <>
                      {item.title
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
                    item.title
                  )}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Sent By:{" "}
                  {item.amName &&
                  item.amName
                    .toLowerCase()
                    .includes(props.searchTerm.toLowerCase()) ? (
                    <>
                      {item.amName
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
                    item.amName
                  )}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Status:{" "}
                  {item.designStatus &&
                  item.designStatus
                    .toLowerCase()
                    .includes(props.searchTerm.toLowerCase()) ? (
                    <>
                      {item.designStatus
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
                    item.designStatus
                  )}
                </p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600 dark:text-white">
                <div>Updated At</div>
                <div>
                  {formatDate(item.updatedAt)
                    .toLowerCase()
                    .includes(props.searchTerm.toLowerCase()) ? (
                    <>
                      {formatDate(item.updatedAt)
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
                    formatDate(item.updatedAt)
                  )}
                </div>
                <Link
                  href={`/designer/task-list/${item.id}`}
                  className={
                    "justify-self-end text-primary-500 hover:text-primary-900"
                  }
                >
                  Actions
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DefaultDesignList;
