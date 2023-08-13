import React, { useState, createRef, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageUrlFor } from "../../lib/image-url";

export const ImageSlider = ({ images }) => {
  const slider = createRef(null);
  const captionRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCaption, setCurrentCaption] = useState(0);

  const previousImage = () => {
    captionRef.current?.classList?.add("opacity-0");
    if (slider.current) {
      slider.current.slickPrev();
    }
  };

  const nextImage = () => {
    captionRef.current?.classList?.add("opacity-0");
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const settings = {
    slidesToShow: 1,
    infinite: true,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentIndex(newIndex);
    },
    afterChange: () => {
      captionRef.current?.classList?.remove("opacity-0");
    }
  };

  useEffect(() => {
    if (images[currentIndex]?.caption) {
      setTimeout(() => setCurrentCaption(images[currentIndex]?.caption), 250);
    } else {
      setCurrentCaption(null);
    }
  }, [currentIndex]);

  const hasPreviousImage = currentIndex !== 0;
  const hasNextImage = currentIndex !== images.length - 1;
  return (
    <>
      <div className="relative image-slider">
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
          className="max-w-[560px] md:max-w-[unset] -ml-4 w-[calc(100%_+_2rem)]"
        >
          {images?.map((image, index) =>
            image.image.asset ? (
              <img
                key={index}
                className="max-w-[560px] md:max-w-[unset] px-4 h-full w-full object-cover"
                src={imageUrlFor(image.image)
                  .width(1000)
                  .auto("format")
                  .url()}
                alt=""
              />
            ) : null
          )}
        </Slider>
      </div>

      <div className="mt-4">
        {images[currentIndex]?.file?.asset?.url ? (
          <a
            className="hover:text-[#000] w-fit flex items-center mt-4 text-mobile-body md:text-desktop-body"
            href={images[currentIndex]?.file?.asset?.url}
            target="_blank"
          >
            Download <span className="block ml-1 mb-1">↓</span>
          </a>
        ) : null}
        <div className="flex justify-center items-center max-w-[560px] md:max-w-[unset]">
          <button
            className="disabled:shadow-none disabled:bg-transparent disabled:opacity-40 mr-2"
            onClick={previousImage}
            // disabled={!hasPreviousImage}
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
    </>
  );
};
