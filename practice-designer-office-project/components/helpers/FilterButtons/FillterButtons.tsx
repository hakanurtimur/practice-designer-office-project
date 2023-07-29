import React from "react";

const FilterButtons: React.FC<{
  setActiveButton: (activeButton: string) => void;
  segments: { name: string; buttonTitle: string }[];
  isSorted: boolean;
  setIsSorted: (isSorted: boolean) => void;
}> = (props) => {
  const { setActiveButton } = props;

  const [activeFilter, setActiveFilter] = React.useState("all");

  const buttonStyles =
    "text-gray-700 text-sm w-full sm:w-auto px-2 py-1 text-center dark:text-white-500";

  const clickHandler = (filter: string) => {
    setActiveFilter(filter);
    return setActiveButton(filter);
  };
  const { segments, isSorted, setIsSorted } = props;

  const buttonList = segments.map((segment, index) => {
    return (
      <li key={index}>
        <button
          type="submit"
          className={
            buttonStyles +
            " " +
            (activeFilter === segment.name && "text-primary-500 underline")
          }
          onClick={() => clickHandler(segment.name)}
        >
          {segment.buttonTitle}
        </button>
      </li>
    );
  });

  return (
    <ul className={"w-6/12 flex flex-row justify-around"}>
      {buttonList && buttonList}
      <button
        className={`${
          isSorted ? "text-primary-500" : "text-gray-700"
        }  w-full sm:w-auto px-2 py-1 text-justify`}
        onClick={() => setIsSorted(true)}
      >
        {"\u2191"}
      </button>
      <button
        className={`${
          !isSorted ? "text-primary-500" : "text-gray-700"
        }  w-full sm:w-auto px-2 py-1 text-justify`}
        onClick={() => setIsSorted(false)}
      >
        {"\u2193"}
      </button>
    </ul>
  );
};

export default FilterButtons;
