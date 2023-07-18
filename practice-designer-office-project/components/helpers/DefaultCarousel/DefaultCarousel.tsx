import React, { useState } from "react";
import Link from "next/link";

interface CarouselProps {
  items: {
    content: string;
    imageUrl: string;
    link: string;
  }[];
}

const DefaultCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === items.length - 1 ? 0 : prevSlide + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? items.length - 1 : prevSlide - 1,
    );
    console.log(currentSlide);
  };

  const sliderList = items.map((item, index) => {
    return (
      <div key={index} className={"flex flex-col justify-end h-full"}>
        <div
          className={`absolute top-1/2 left-1/2  transition-all duration-700 transform -translate-x-1/2 -translate-y-1/2 ${
            index === currentSlide ? "opacity-100" : `opacity-0 -z-10`
          }`}
        >
          <div className={"text-center mb-1"}>
            <p>{item.content}</p>
          </div>
          <Link href={`/${item.link}`}>
            <img
              className={"w-40 h-40 bg-gray-300 rounded-full"}
              src={item.imageUrl}
              alt=""
            />
          </Link>
        </div>
        <button
          onClick={() => {
            setCurrentSlide(index);
          }}
          className={`w-3 h-3 bg-gray-900 rounded-full hover:bg-primary-500 dark:bg-gray-700 mb-7 ${
            index === currentSlide ? "opacity-100 bg-primary-500" : `opacity-50`
          }`}
        ></button>
      </div>
    );
  });

  return (
    <div
      className={
        "flex flex-row items-center rounded-2xl bg-gray-100 justify-between w-8/12 h-full mx-auto relative"
      }
    >
      <button
        className="rounded-full hover:text-white hover:bg-primary-500 bg-gray-400 mx-2 p-2"
        onClick={prevSlide}
      >
        <svg
          className="w-5 h-5 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
      {sliderList && sliderList}
      <button
        className="rounded-full hover:bg-primary-500 hover:text-white bg-gray-400 mx-2 p-2"
        onClick={nextSlide}
      >
        <svg
          className="w-5 h-5 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default DefaultCarousel;
