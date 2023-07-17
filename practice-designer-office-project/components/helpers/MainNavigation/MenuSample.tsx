import React from "react";
import Link from "next/link";
const MenuSample: React.FC<{
  isLoggedIn: boolean;
  contentArray: {
    title: string;
    link: string;
  }[];
  buttonArray: { title: string; function: () => void; id: string }[];
}> = (props) => {
  const contentArray = props.contentArray;
  const buttonArray = props.buttonArray;
  const contentList = contentArray.map((item, index) => {
    return (
      <li key={index}>
        <Link
          href="/"
          className="block py-2 pl-3 pr-4 text-primary-600 border-b border-gray-100
               dark:text-primary-500 hover:text-primary-900
               dark:hover:bg-gray-700 dark:hover:text-primary-500
               dark:border-gray-700"
          aria-current="page"
        >
          {item.title}
        </Link>
      </li>
    );
  });
  const buttonList = buttonArray.map((item) => {
    return (
      <li key={item.id}>
        <Link
          href="/"
          type="button"
          className="block py-2 pl-3 pr-4 text-primary-600 border-b border-gray-100
               dark:text-primary-500 hover:text-primary-900
               dark:hover:bg-gray-700 dark:hover:text-primary-500
               dark:border-gray-700"
          aria-current="page"
          onClick={item.function}
        >
          {item.title}
        </Link>
      </li>
    );
  });

  return (
    <div className="hidden md:block">
      {props.isLoggedIn && (
        <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
          {contentList && contentList}
          {buttonList && buttonList}
        </ul>
      )}
    </div>
  );
};

export default MenuSample;
