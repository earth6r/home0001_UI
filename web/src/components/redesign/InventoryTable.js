import React, { useState, useEffect, useRef } from "react";
// import { useSnapCarousel } from "react-snap-carousel";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const InventoryTable = ({ data }) => {
  //   const { scrollRef, next, prev } = useSnapCarousel();
  //   const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "60px",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px"
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px"
        }
      }
    ]
  };
  const { headers, rows } = data;
  return (
    <div className="w-full flex gap-20">
      {/* <Slider {...settings}>
        <div>
          <h3>Slide 1</h3>
        </div>
        <div>
          <h3>Slide 2</h3>
        </div>
        <div>
          <h3>Slide 3</h3>
        </div>
        <div>
          <h3>Slide 4</h3>
        </div>
        ...
      </Slider> */}
      {/* <button onClick={() => sliderRef.current.slickPrev()}>Previous</button>
      <button onClick={() => sliderRef.current.slickNext()}>Next</button> */}
      {headers &&
        headers.map((head, index) => {
          let currentHeader = index;
          if (head.length > 0) {
            return (
              <ul key={index} className="text-base w-full">
                <li className="mb-4 uppercase" key={`header-${head}-${index}`}>
                  <p>{head}</p>
                </li>
                {rows &&
                  rows.map(row => {
                    return (
                      <li key={`row-${row._key}`} className="flex flex-row center py-0 px-0">
                        {row.cells &&
                          row.cells.map((cell, index) => {
                            if (index == currentHeader && cell.text) {
                              return (
                                <p key={index} className="">
                                  {cell.text}
                                </p>
                              );
                            }
                          })}
                      </li>
                    );
                  })}
              </ul>
            );
          }
        })}
    </div>
  );
};

export const ColumnSlider = ({ tables, children }) => {
  const [currentTableIndex, setCurrentTableIndex] = useState(0);
  useEffect(() => {
    setCurrentTableIndex(0);
  }, [tables]);
  const previousImage = () => {
    const newIndex = currentTableIndex === 0 ? tables.length - 1 : currentTableIndex - 1;
    setCurrentTableIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = currentTableIndex === tables.length - 1 ? 0 : currentTableIndex + 1;
    setCurrentTableIndex(newIndex);
  };

  const hasPreviousColumn = currentTableIndex !== 0;
  const hasNextColumn = currentTableIndex !== tables.length - 1;
  console.log(tables, "tables");
  console.log(currentTableIndex, "currentTableIndex");
  return (
    <>
      <div className="flex flex-col">
        <div>{children}</div>
        <div className="flex gap-2 mt-4">
          <button
            className={`${
              !hasPreviousColumn ? "opacity-40 cursor-default" : ""
            } bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow`}
            onClick={previousImage}
            disabled={!hasPreviousColumn}
          >
            <svg
              className="transform rotate-180 inline-block mr-2"
              width="22"
              height="10"
              viewBox="0 0 22 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
                fill="currentColor"
              />
            </svg>
            Previous
          </button>
          <button
            className={`${
              !hasNextColumn ? "opacity-40 cursor-default" : ""
            } bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow`}
            onClick={nextImage}
            disabled={!hasNextColumn}
          >
            Next
            <svg
              className="inline-block ml-2"
              width="22"
              height="10"
              viewBox="0 0 22 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
