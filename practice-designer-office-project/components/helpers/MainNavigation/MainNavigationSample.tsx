import React, { useState } from "react";
import Link from "next/link";
import MenuSample from "@/components/helpers/MainNavigation/MenuSample";
import DropDownMenuSample from "@/components/helpers/MainNavigation/DropDownMenuSample";

const MainNavigationSample: React.FC<{
  contentArray: { title: string; link: string }[];
  buttonArray: { title: string; function: () => void; id: string }[];
}> = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const isLoggedIn = true;
  const contentArray = props.contentArray;
  const buttonArray = props.buttonArray;

  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary-600 dark:text-white">
            Designer
          </span>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary-300 dark:text-white">
            Office
          </span>
        </Link>
        <DropDownMenuSample
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          contentArray={contentArray}
          buttonArray={buttonArray}
        />
        <MenuSample
          contentArray={contentArray}
          isLoggedIn={isLoggedIn}
          buttonArray={buttonArray}
        />
      </div>
    </nav>
  );
};

export default MainNavigationSample;
