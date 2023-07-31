import React from "react";
import Link from "next/link";
import MenuIcon from "@/components/ui/Navigation/MenuIcon";

const DropDownMenuSample: React.FC<{
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
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
      <li key={index} onClick={props.toggleDropdown}>
        <Link
          href={`${item.link}`}
          className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-50"
        >
          {item.title}
        </Link>
      </li>
    );
  });

  const buttonList = buttonArray.map((item) => {
    return (
      <li key={item.id} onClick={props.toggleDropdown}>
        <Link
          href="/"
          type="button"
          className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-50"
          aria-current="page"
          onClick={item.function}
        >
          {item.title}
        </Link>
      </li>
    );
  });
  return (
    <div className="relative md:hidden z-40">
      <button
        type="button"
        onClick={props.toggleDropdown}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open main menu</span>
        <MenuIcon />
      </button>
      {props.isDropdownOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-md dark:bg-gray-700 dark:ring-gray-600">
          <ul className="py-2">
            {contentList && contentList}
            {buttonList && buttonList}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownMenuSample;
