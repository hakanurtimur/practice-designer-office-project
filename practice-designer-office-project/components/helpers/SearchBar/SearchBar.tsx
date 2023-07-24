import React, { useState } from "react";

const SearchBar: React.FC<{
  content: string;
  placeholder: string;
  filter: (searchTerm: string) => void;
}> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);
  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
          focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={props.placeholder}
          required
          onChange={(e) => {
            e.preventDefault();
            setSearchQuery(e.target.value);
          }}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4
           focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600
            dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={(e) => {
            e.preventDefault();
            props.filter(searchQuery);
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
