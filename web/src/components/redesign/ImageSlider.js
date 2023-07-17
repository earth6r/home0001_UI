import React, { useState, createRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageUrlFor } from "../../lib/image-url";

export const ImageSlider = ({ images }) => {
  const slider = createRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousImage = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };

  const nextImage = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const settings = {
    slidesToShow: 1,
    infinite: false,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentIndex(newIndex);
    }
  };

  const hasPreviousImage = currentIndex !== 0;
  const hasNextImage = currentIndex !== images.length - 1;
  return (
    <div className="relative flex flex-col gap-4 image-slider">
      <div
        className="hidden md:block cursor-pointer w-1/2 h-full absolute top-0 left-0 z-10"
        onClick={previousImage}
      />
      <div
        className="hidden md:block cursor-pointer w-1/2 h-full absolute top-0 right-0 z-10"
        onClick={nextImage}
      />
      <Slider
        ref={slider}
        {...settings}
        className="max-h-[487px] pr-[2.625rem] md:pr-0 md:max-h-[741px] -ml-4 md:w-[calc(100%_+_2rem)]"
      >
        {images?.map((image, index) =>
          image.asset ? (
            <img
              key={index}
              className="max-h-[487px] px-4 md:max-h-[741px] h-full w-full object-cover"
              src={imageUrlFor(image)
                .width(1000)
                .auto("format")
                .url()}
              alt=""
            />
          ) : null
        )}
      </Slider>
      <div className="flex justify-center items-center gap-2 pr-mobile-menu md:pr-0">
        <button
          className="disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
          onClick={previousImage}
          disabled={!hasPreviousImage}
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
        <button
          className="disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
          onClick={nextImage}
          disabled={!hasNextImage}
        >
          <svg
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
      </div>
    </div>
  );
};
