import React, { useState, useEffect } from "react";

export const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);
  const previousImage = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const hasPreviousImage = currentImageIndex !== 0;
  const hasNextImage = currentImageIndex !== images.length - 1;
  return (
    <div className="flex flex-col gap-4 items-center max-h-[487px] max-w-[480px] md:max-w-[585px] md:max-h-[741px]">
      <div className="w-full">
        <img
          className="max-h-[487px] max-w-[480px] md:max-w-[585px] md:max-h-[741px] h-auto w-full mb-4 object-cover"
          src={images[currentImageIndex]?.asset?.url}
          alt=""
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className=" disabled:shadow-none disabled:bg-transparent disabled:opacity-40"
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
