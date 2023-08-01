import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";

export const InventoryTable = ({ data }) => {
  const { headers, rows } = data;
  const slider = useRef(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    slidesToShow: isDesktop ? 3 : 1,
    infinite: false,
    arrows: false,
    centerMode: isDesktop ? false : true,
    centerPadding: isDesktop ? "" : "50vw 0px 0px 0px",
    beforeChange: (oldIndex, newIndex) => {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="inventory-slider flex flex-col justify-between h-full w-full">
      <Slider ref={slider} {...settings} className="w-full flex-1">
        {headers &&
          headers.map((head, index) => {
            let currentHeader = index;
            if (head.length > 0) {
              return (
                <div key={index} className="w-full pt-24 md:pt-16">
                  <ul>
                    <li className="mb-4 uppercase px-4 md:px-0" key={`header-${head}-${index}`}>
                      <p>{head}</p>
                    </li>
                    {rows?.map(row => {
                      return (
                        <li key={`row-${row._key}`} className="flex mx-4 md:mx-0 md:mr-4">
                          {row.cells &&
                            row.cells.map((cell, index) => {
                              if (index == currentHeader) {
                                return <p key={index}>{cell.text}</p>;
                              }
                            })}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })}
      </Slider>
      {headers && ((!isDesktop && headers.length > 1) || (isDesktop && headers.length > 3)) && (
        <div className="flex justify-center items-center w-full gap-2 mt-8">
          <CustomPrevButton
            onClick={() => slider.current.slickPrev()}
            disabled={currentIndex === 0}
          />
          <CustomNextButton
            onClick={() => slider.current.slickNext()}
            disabled={currentIndex === headers.length - 1}
          />
        </div>
      )}
    </div>
  );
};

const CustomPrevButton = ({ disabled, onClick }) => (
  <button
    className="disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
    onClick={onClick}
    disabled={disabled}
  >
    <svg
      className="transform rotate-180"
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
        fill="black"
      />
    </svg>
  </button>
);

const CustomNextButton = ({ disabled, onClick }) => (
  <button
    className="disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
    onClick={onClick}
    disabled={disabled}
  >
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5191 5.22869e-07L21.5 5L15.5191 10L14.4911 9.15179L18.7231 5.61384L0.5 5.61384L0.5 4.38616L18.7231 4.38616L14.4911 0.859376L15.5191 5.22869e-07Z"
        fill="black"
      />
    </svg>
  </button>
);
